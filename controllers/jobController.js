import "express-async-errors"; // Place at the very top
import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

// Set up functions that will be callbacks for API
// All job requests have access to req.user (through parsing cookie and decoding jwt token) which contains user's id and role

// GET All Jobs
export const getAllJobs = async (req, res) => {
  // console.log(req.user);
  // console.log(req.query);
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search) {
    // queryObj.position = req.query.search;
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  }

  // console.log(queryObj);

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // Pagination
  const currentPage = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (currentPage - 1) * limit;

  const totalJobs = await Job.countDocuments(queryObj);
  // console.log(totalJobs);

  const totalPages = Math.ceil(totalJobs / limit);

  const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit); // Find all jobs--leave argument object empty; add a filter--add property/value pairs, e.g. await Job.find({company: "Google"}) to only find positions at Google

  res.status(StatusCodes.OK).json({ totalJobs, totalPages, currentPage, jobs }); // 200
};

// Get Single Job
export const getSingleJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

// POST Create a Job
export const createJob = async (req, res) => {
  // Add createdBy:userId to req.body before adding to db
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job }); // 201
};

// Edit a Job
export const editJob = async (req, res) => {
  let updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // The 2nd parameter is an object specifying property/value pairs to update, the 3rd parameter is optional. by default, the value will be the old one, by setting {new: true}, we get the updated document
  // console.log(updateJob);
  res.status(StatusCodes.OK).json({ msg: "Job updated", job: updateJob });
};

// Delete a job
export const deleteJob = async (req, res) => {
  let removeJob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "Job deleted", job: removeJob });
};

// Stats
// https://www.mongodb.com/docs/manual/core/aggregation-pipeline/
export const showStats = async (req, res) => {
  const mongoUserId = new mongoose.Types.ObjectId(req.user.userId);

  let stats = await Job.aggregate([
    { $match: { createdBy: mongoUserId } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  // console.log(stats);

  // Override stats
  stats = stats.reduce((obj, curr) => {
    const { _id: jobStatus, count } = curr;
    obj[jobStatus] = count;
    return obj;
  }, {});

  // In case there is no application:
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoUserId } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } }, // sort in descending order to get the most recent ones
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((obj) => {
      // const { _id, count } = obj;
      // const { year, month } = _id;

      const {
        _id: { year, month },
        count,
      } = obj;

      // const date = day(`${year}-${month}`).format("MMM YYYY");
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YYYY");
      return { date, count };
    })
    .reverse(); // Send data to frontend in ascending order

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
