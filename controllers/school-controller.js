import db from "../config/db.js";
import { isValidCoordinates, calculateDistance } from "../utils/geolocation.js";

export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    res
      .status(201)
      .json({
        message: "School added successfully",
        schoolId: result.insertId,
      });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

export const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!isValidCoordinates(latitude) || !isValidCoordinates(longitude)) {
    return res
      .status(400)
      .json({
        message:
          "Invalid input data. Latitude and longitude must be valid numbers.",
      });
  }

  const userLatitude = parseFloat(latitude);
  const userLongitude = parseFloat(longitude);

  try {
    const [schools] = await db.query(
      "SELECT id, name, address, latitude, longitude FROM schools"
    );
    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          userLatitude,
          userLongitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
    console.log(error);
  }
};
