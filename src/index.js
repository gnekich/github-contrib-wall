import fs from "fs/promises";
import { DateTime } from "luxon";

// Define single commit command
const createSingleCommit = (dateString) => {
  return `GIT_AUTHOR_DATE=${dateString} GIT_COMMITTER_DATE=${dateString} git commit --allow-empty -m "brush" > /dev/null`;
};

// Get template from env variable
let parsedPointsToPaintFromEnv;
if (process.env.POINTS_TO_PAINT) {
  try {
    parsedPointsToPaintFromEnv = JSON.parse(process.env.POINTS_TO_PAINT);
  } catch (error) {
    console.log(error);
  }
}

const pointsToPaint = parsedPointsToPaintFromEnv ?? [
  0, 0, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4,
  0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 4,
  4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4,
  0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4,
  0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0,
  4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0,
  0, 0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 4, 4,
  4, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0,
  4, 1, 1, 4, 0, 0, 0, 0, 4, 1, 1, 4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4, 0,
  0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0,
];

const baseValue = process.env.POINT_BASE_VALUE
  ? parseInt(process.env.POINT_BASE_VALUE, 10)
  : 0;

// --- Time logic start ---
// Init the start date
const TODAY = DateTime.local();
const START_DAY = TODAY.minus({ days: pointsToPaint.length - 1 })
  .startOf("week")
  .minus({ days: 1 });

const commits = [];
for (let i = 0; i < pointsToPaint.length; i++) {
  const pointValue = pointsToPaint[i] + baseValue;
  const dateString =
    START_DAY.plus({ days: i }).toFormat("yyyy-LL-dd") + "T12:00:00";

  for (let j = 0; j < pointValue; j++) {
    commits.push(createSingleCommit(dateString));
  }
}
// --- Time logic end ---

const template = await fs.readFile("./painter-template.sh", "utf-8");

await fs.writeFile(
  "./painter.sh",
  template.replace("#{{GIT_COMMITS}}", commits.join("\n")),
  "utf-8"
);
