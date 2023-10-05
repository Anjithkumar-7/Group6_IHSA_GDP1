const express = require("express");
const router = express.Router();
const mysql = require("../mysql-server");
const upload = require("../files-upload/uploader");
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');

router.get('/list-tables', async (req, res) => {
  const query = `show tables`;
  const result = await mysql.query(query);
  res.send(result);
})

router.get("/getEvents", async (req, res) => {
  try {

    const query = `SELECT * FROM events`;
    const result = await mysql.query(query);
    if (result[0].length > 0) {
      //  console.log(result);
      res.status(200).json({ events: result[0] });
    } else {
      //  console.log(result);
      res.status(201).json({ error: "No data to fetch from table" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while fetching ${req.body} from database` });
  }

});

router.get("/getAllAnnouncements", async (req, res) => {
  try {
    const query = `SELECT * FROM announcements`;
    const result = await mysql.query(query);
    if (result[0].length > 0) {
      //  console.log(result);
      res.status(200).json({ events: result[0] });
    } else {
      //  console.log(result);
      res.status(201).json({ error: "No data to fetch from table" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while fetching ${req.body} from database` });
  }

});

router.get("/getEventsForPhotos", async (req, res) => {
  try {
    const query = `SELECT E.EventID, E.EventName, P.Link
    FROM events AS E
    LEFT JOIN photos AS P ON E.EventID = P.EventID`;
    const result = await mysql.query(query);
    //  console.log(result);
    if (result[0].length == 0) {
      res.status(201).json({ error: "No data to fetch from table" });
    } else {
      res.status(200).json({ events: result[0] });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while fetching events from database` });
  }
})
router.post("/getImagesLink", async (req, res) => {
  try {
    const { EventID } = req.body;
    const query = `SELECT * FROM photos WHERE EventID = ${EventID}`;
    const result = await mysql.query(query);
    console.log(result)
    if (result[0].length == 0) {
      res.status(201).json({ error: "Images Link are empty" });
    } else {
      res.status(200).json({ success: result[0] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error });
  }
});

router.post("/getAnnouncements", async (req, res) => {
  try {
    const { EventID } = req.body;
    const query = `SELECT * FROM announcements WHERE EventID = ${EventID}`;
    const result = await mysql.query(query);
    console.log(result);
    if (result[0].length == 0) {
      res.status(201).json({ error: "Announcements are empty" });
    } else {
      res.status(200).json({ success: result[0] });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }

});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ error: "Please fill form completely" });
  } else {
    try {
      const query =
        "INSERT INTO admin (username, password) VALUES (?, ?)";
      let signup = await mysql.query(query, [username, password]);
      console.log(signup)
      res.status(201).json({ success: "Signup Success" });
    } catch (err) {
      res.status(500).json({ error: err })
    }


  }

});

router.post("/login", async (req, res) => {

  const { username, password } = req.body;
  const sqlQuery = "SELECT * FROM admin WHERE BINARY username = ?";
  const [users] = await mysql.execute(sqlQuery, [username]);

  if (users.length === 0) {
    res.json({ msg: "User does not exist" });
  } else {
    if (users[0].password === password) {
      res.status(200).json({ success: "Login successful" });
    } else {
      res.status(500).json({ error: "Invalid credential" });
    }
  }

});

router.post("/addEvent", async (req, res) => {
  const { name, time, location } = req.body;
  if (!name || !time || !location) {
    res.status(401).json({ error: "Enter details completely" });
  } else {
    try {
      const query =
        "INSERT INTO events (EventName, EventDate, EventLocation) VALUES (?,?,?)";
      let signup = await mysql.query(query, [name, time, location]);
      console.log(signup)
      res.status(201).json({ success: "Event Added" });
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }

});

router.post("/editEvent", async (req, res) => {
  try {
    const { EventID, name, date, location } = req.body
    if (!EventID || !name, !date || !location) {
      res.status(401).json({ errorMessage: "Enter complete data" });
    } else {
      const query = `UPDATE events SET EventName = ?, EventDate = ?, EventLocation = ? WHERE EventID = ${EventID};`
      let update = await mysql.query(query, [name, date, location]);
      console.log(update);
      res.status(200).json({ success: "Edited Successfully" });
    }

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
});

router.post("/deleteEvent", async (req, res) => {
  try {
    const { EventID } = req.body;
    if (!EventID) {
      res.status(401).json({ errorMessage: "Enter complete data" });
    } else {


      const query = `DELETE FROM events WHERE EventID = ?;`;
      const Pquery = `DELETE FROM photos WHERE EventID = ?; `;
      const Aquery = `DELETE FROM announcements WHERE EventID = ?; `;
      const Cquery = `DELETE FROM classes WHERE EventID = ?; `;
      const Rquery = `DELETE FROM riders WHERE EventID = ?; `;
      const Hquery = `DELETE FROM horses WHERE EventID = ?; `;
      const Comquery = `DELETE FROM combinations WHERE EventID = ?; `;
      const Squery = `DELETE FROM schedules WHERE EventID = ?; `;
      await mysql.query(Pquery, [EventID]);
      await mysql.query(Aquery, [EventID]);
      await mysql.query(Squery, [EventID]);
      await mysql.query(Cquery, [EventID]);
      await mysql.query(Rquery, [EventID]);
      await mysql.query(Hquery, [EventID]);
      await mysql.query(Comquery, [EventID]);
      await mysql.query(query, [EventID]);
      //  console.log(update);
      res.status(200).json({ success: "deleted Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
})

router.post("/createEventDashboard", async (req, res) => {
  try {
    const { eventName } = req.body;
    const checkTableQuery = `SELECT * FROM events WHERE EventName = ?`;
    const tableExists = await mysql.query(checkTableQuery, [eventName])
    console.log(tableExists)
    if (tableExists[0].length > 0) {
      console.log(`Table '${eventName}' already exists`);
      res.status(200).json({ error: 'Table already exists' });
    } else {
      const createTableQuery = `INSERT INTO events (EventName, EventDate, EventLocation) VALUES (?, ?, ?)`;
      let result = await mysql.query(createTableQuery, [eventName, date, location]);
      //  console.log(result);
      res.status(200).json({ success: "Event inserted successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});


router.post("/getParticularEvent", async (req, res) => {
  try {
    const { eventName } = req.body;
    const query = `SELECT * FROM events `;
    const result = await mysql.query(query);
    if (result.length > 0) {
      //  console.log(result);
      res.status(200).json({ success: "Table data fetched successfully" });
    } else {
      console.log(result);
      res.status(201).json({ success: "No data to fetch from table" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while fetching ${req.body} from database` });
  }

});

router.post("/addAnnouncement", async (req, res) => {
  try {
    const { title, content, EventID } = req.body;
    const query = `INSERT INTO announcements (EventID ,Title, Content) VALUES (?,?,?)`;
    const result = await mysql.query(query, [EventID, title, content]);
    //  console.log(result);
    res.status(200).json({ success: "Announcement successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while adding announcements into database` });
  }

})

router.post("/editAnnouncement", async (req, res) => {
  try {
    const { AnnouncementID, Title, Content } = req.body;
    const query = `UPDATE announcements SET Title = ?, Content = ? WHERE AnnouncementID = ${AnnouncementID};`;
    const result = await mysql.query(query, [Title, Content]);
    // console.log(result);
    res.status(200).json({ success: "Announcement edited successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while adding announcement to database` });
  }
})


router.post("/deleteAnnouncement", async (req, res) => {
  try {
    const { AnnouncementID } = req.body;
    const query = `DELETE FROM announcements WHERE AnnouncementID = ?;`
    const result = await mysql.query(query, [AnnouncementID]);
    //  console.log(result);
    res.status(200).json({ success: "Announcement deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while deleting announcement in database` });
  }
});

router.post("/addImagesLink", async (req, res) => {
  try {
    const { EventID, Link } = req.body;
    const query = `INSERT INTO photos (EventID , Link) VALUES (?,?)`;
    const result = await mysql.query(query, [EventID, Link]);
    //  console.log(result);
    res.status(200).json({ success: "Image link added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while adding Image link in database` });
  }

});

router.post("/editImagesLink", async (req, res) => {
  try {
    const { PhotoID, Link } = req.body;
    const query = `UPDATE photos SET Link = ? WHERE PhotoID = ${PhotoID};`;
    const result = await mysql.query(query, [Link]);
    // console.log(result);
    res.status(200).json({ success: "Photo Link edited successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while adding Image link to database` });
  }
})


router.post("/deleteImagesLink", async (req, res) => {
  try {
    const { PhotoID } = req.body;
    const query = `DELETE FROM photos WHERE PhotoID = ?;`
    const result = await mysql.query(query, [PhotoID]);
    //  console.log(result);
    res.status(200).json({ success: "Image deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while deleting Photo in database` });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  },
});

const uploadFile = multer({ storage: storage });

router.post("/uploadRiderDetails", uploadFile.single('riderFile'), async (req, res) => {
  try {
    const { EventID, filename } = req.body,
      isAdded = 0;
    let classesList = [];
    if (EventID) {
      const data = await readXlsxFile(__dirname + '/uploads/' + req.file.filename).then((rows) => {
        rows.shift();
        if (rows) {
          return rows;
        }
      })
      // const data = await importFileToDb(__dirname + '/uploads/' + req.file.filename);
      const query = `INSERT INTO riders (EventID, RiderId, Name, Height, Weight, Experience, School, Class, Remarks,file_name) VALUES (?,?,?,?,?,?,?,?,?,?);`
      for (let a = 0; a < data.length; a++) {
        const [
          RiderId,
          Name,
          Height,
          Weight,
          Experience,
          School,
          Class,
          Remarks,
        ]
          = data[a];
        await mysql.query(query, [EventID, RiderId, Name, Height, Weight, Experience, School, Class, Remarks, filename]);
        classesList.push(Class);
      }


      var tempClasses = [...new Set(classesList)];
      const classesQuery = `INSERT INTO classes (EventID, classname, isAdded) VALUES (?,?,?);`;
      for (let b = 0; b < tempClasses.length; b++) {
        await mysql.query(classesQuery, [EventID, tempClasses[b], isAdded]);
      }
      console.log("Riders added Successfully");
      res.status(200).json({ success: "Success" });
    } else {
      res.status(404).json({ success: "Page not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});


router.post("/uploadHorseDetails", uploadFile.single('horseFile'), async (req, res) => {
  try {
    const { EventID, filename } = req.body;
    if (EventID) {
      const data = await readXlsxFile(__dirname + '/uploads/' + req.file.filename).then((rows) => {
        rows.shift();
        if (rows) {
          return rows;
        }
      })
      // const data = await importFileToDb(__dirname + '/uploads/' + req.file.filename);
      const query = `INSERT INTO horses (EventID, Name, Provider, Spurs, Rein_hold, Remarks, Class,file_name) VALUES (?,?,?,?,?,?,?,?);`
      for (let a = 0; a < data.length; a++) {
        const [
          Name, Provider, Spurs, Rein_hold, Remarks, Class
        ] = data[a];

        await mysql.query(query, [EventID, Name, Provider, Spurs, Rein_hold, Remarks, Class, filename]);
      }
      console.log("Horses added Successfully");
      res.status(200).json({ success: "Success" });
    } else {
      res.status(404).json({ success: "Page not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
router.post("/addClass", async (req, res) => {
  try {
    const { EventID, classname } = req.body,
      isAdded = 1;
    if (EventID && classname) {
      const query = `INSERT INTO classes (EventID,classname,isAdded) VALUES (?,?,?);`
      await mysql.query(query, [EventID, classname, isAdded]);
      res.status(200).json({ success: "class Added" })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
})
router.post("/getClasses", async (req, res) => {
  try {
    const { EventID } = req.body;
    const query = `SELECT * FROM classes WHERE EventID = ${EventID};` // AND isAdded = 1;`;
    const list = await mysql.query(query);
    // console.log(list);
    if (list[0].length == 0) {
      res.status(200).json({ errorMessage: "Data is empty" });
    } else {
      res.status(200).json({ success: "Succesfully fetched", list: list[0] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post("/deleteClass", async (req, res) => {
  try {
    let { EventID, classname } = req.body;
    // console.log(classname)
    classname = classname.toString().trim()
    const query = `UPDATE classes SET classname = NULL WHERE EventID = ${EventID} AND classname = \'${classname}\';`

    const result = await mysql.query(query);
    // console.log(result)
    res.status(200).json({ success: "Class edited successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post("/getClassCategorization", async (req, res) => {
  try {
    const { EventID } = req.body;
    if (EventID) {
      const Rquery = `SELECT * FROM riders WHERE EventID = ${EventID};`;
      const Hquery = `SELECT * FROM horses WHERE EventID = ${EventID};`;
      const Cquery = `SELECT * FROM classes WHERE EventID = ${EventID};`;

      const Rlist = await mysql.query(Rquery);
      const Hlist = await mysql.query(Hquery);
      const Clist = await mysql.query(Cquery);

      //Unique Riders filtering starts here.
      const uniqueRecords = {};
      Rlist[0].forEach((obj) => {
        const { RiderId, Name, School, Weight, Height, Experience, EventID, ID, Remarks, file_name } = obj;

        // If RiderId is not in uniqueRecords, initialize it with Class as an empty array
        if (!uniqueRecords[RiderId]) {
          uniqueRecords[RiderId] = {
            RiderId,
            Name,
            School,
            Weight,
            Height,
            Experience,
            EventID,
            ID,
            Remarks,
            file_name,
            Classes: []
          };
        }

        // Push the Class into the Classes array
        uniqueRecords[RiderId].Classes.push(obj.Class);
      });

      // Convert the values of uniqueRecords object into an array
      const uniqueRiders = Object.values(uniqueRecords);
      //Unique Riders filtering Ends here.

      //Unique Horses filtering Starts here.
      const uniqueRecordsObj = {};
      Hlist[0].forEach((obj) => {
        const { Class, EventID, ID, Name, Provider, Rein_hold, Remarks, Spurs, file_name } = obj;

        // If Name is not in uniqueRecordsObj, initialize it with Class as an empty array
        if (!uniqueRecordsObj[Name]) {
          uniqueRecordsObj[Name] = {
            ID,
            EventID,
            Name,
            Provider,
            Rein_hold,
            Remarks,
            Spurs,
            file_name,
            Classes: []
          };
        }
        // Push the Class into the Classes array
        uniqueRecordsObj[Name].Classes.push(obj.Class);
      });

      // Convert the values of uniqueRecords object into an array
      const uniqueHorses = Object.values(uniqueRecordsObj);
      //Unique Horses filtering ends here.
      // console.log(uniqueHorses);

      if (Rlist[0].length == 0 || Hlist[0] == 0 || Clist[0] == 0) {
        res.status(200).json({ errorMessage: "Data is empty" });
      } else {
        res.status(200).json({
          success: "Successfuly Fetched",
          Riders: Rlist[0],
          Horses: Hlist[0],
          Classes: Clist[0],
          uniqueRiders: uniqueRiders,
          uniqueHorses: uniqueHorses
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
})

router.post("/getCombinations", async (req, res) => {
  try {
    const { EventID } = req.body;
    if (EventID) {
      // const query = `SELECT * FROM classes WHERE EventID = ${EventID}`;
      const cquery = `SELECT classname FROM classes WHERE EventID = ${EventID}`;
      const list = await mysql.query(cquery);
      // const list = await mysql.query(query);
      //  console.log(list[0]);
      res.status(200).json({ list: list[0] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post("/getRandom", async (req, res) => {
  try {
    const { EventID, classname } = req.body;
    if (EventID) {
      const rquery = `SELECT * FROM riders WHERE EventID = ${EventID} AND Class = \'${classname}\'`;
      const hquery = `SELECT * FROM horses WHERE EventID = ${EventID} AND Class = \'${classname}\'`;
      const hlist = await mysql.query(hquery);
      const rlist = await mysql.query(rquery);
      // console.log(hlist[0],rlist[0]);
      if (!hlist[0] || !rlist[0]) {
        res.status(200).json({ errorMessage: "No horses or riders data" });
      }
      res.status(200).json({ success: "sucess", hlist: hlist[0], rlist: rlist[0] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
router.post("/saveCombination", async (req, res) => {
  try {
    const { EventID, classname, horses, riders } = req.body;
    let clear = `DELETE FROM combinations WHERE EventID = ? AND classname = ?`;
    let clean = await mysql.query(clear, [EventID, classname]);
    const query = `INSERT INTO combinations(EventID,classname,RiderName,HorseName) VALUES(?,?,?,?);`;
    const leng = horses.length
    for (let i = 0; i < leng; i++) {
      let list = await mysql.query(query, [EventID, classname, riders[i], horses[i]]);
    }
    res.status(200).json({ success: "Uploaded Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

router.post("/getSchedule", async (req, res) => {

  try {
    const { EventID } = req.body;
    const query = `SELECT * FROM combinations WHERE EventID = ${EventID}`;
    const rquery = `SELECT * FROM riders WHERE EventID = ${EventID}`;
    const hquery = `SELECT * FROM horses WHERE EventID = ${EventID}`;
    const horses = await mysql.query(hquery);
    const riders = await mysql.query(rquery);
    const list = await mysql.query(query);
    if (list[0].length == 0) {
      res.status(200).json({ errorMessage: "No schedule data" });
    } else {
      res.status(200).json({ success: "Fetched Successfully...", list: list[0], riders: riders[0], horses: horses[0] });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }

});

router.post("/updateRider", async (req, res) => {

  try {
    const { name, riderid, height, weight, EventId, experience, classname, remarks, originalClass, originalId } = req.body;
    // console.log(name,riderid,height,weight,EventId,experience,classname,remarks,originalClass, originalId)
    if (EventId) {
      const query = `UPDATE riders SET  Name = ? ,RiderId = ?,Height = ?,Weight = ?,Experience = ?,Class =  ?,Remarks = ? WHERE EventID = ${EventId} AND Class = \'${originalClass}\' AND RiderId = ${originalId} ;`;
      const result = await mysql.query(query, [name, riderid, height, weight, experience, classname, remarks]);
      // console.log(result);
      res.status(200).json({ success: "Rider data edited successfully" });
    } else {
      res.status(404).json({ error: "Page not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while adding rider data to database` });
  }

})


router.post("/updateHorse", async (req, res) => {

  try {
    const { name, spurs, rein_hold, EventId, provider, classname, remarks, originalClass, originalName } = req.body;

    if (EventId) {
      const query = `UPDATE horses SET  Name = ? ,Provider = ?,Spurs = ?,Rein_hold =  ?, Class = ?,Remarks = ? WHERE EventID = ${EventId} AND Class = \'${originalClass}\' AND Name = \'${originalName}\' ;`;
      const result = await mysql.query(query, [name, provider, spurs, rein_hold, classname, remarks]);
      // console.log(result);
      res.status(200).json({ success: "Horse data edited successfully" });
    } else {
      res.status(404).json({ error: "Page not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while adding horse data to database` });
  }

});

router.post("/getfilenames", async (req, res) => {

  try {
    const { EventID } = req.body;
    const rquery = `SELECT file_name FROM riders WHERE EventID = ?;`
    const rfile = await mysql.query(rquery, [EventID]);
    const hquery = `SELECT file_name FROM horses WHERE EventID = ?;`
    const hfile = await mysql.query(hquery, [EventID]);
    //  console.log(result);
    //  console.log(rfile[0][0],hfile[0][0])
    res.status(200).json({ success: "Filename fetched successfully", rfile: rfile[0], hfile: hfile[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while deleting Photo in database` });
  }
});


router.post("/deleteFile", async (req, res) => {
  try {
    const { EventID } = req.body;
    if (req.body.rider) {
      const query = `DELETE FROM riders WHERE EventID = ?;`;
      const Cquery = `DELETE FROM classes WHERE EventID = ?; `;
      const Comquery = `DELETE FROM combinations WHERE EventID = ?; `;
      const Squery = `DELETE FROM schedules WHERE EventID = ?; `;
      await mysql.query(Squery, [EventID]);
      await mysql.query(Cquery, [EventID]);
      await mysql.query(Comquery, [EventID]);
      const result = await mysql.query(query, [EventID]);
      //  console.log(result);
      res.status(200).json({ success: "Rider file deleted successfully" });
    }
    if (req.body.horse) {
      const query = `DELETE FROM horses WHERE EventID = ?;`;
      const Cquery = `DELETE FROM classes WHERE EventID = ?; `;
      const Comquery = `DELETE FROM combinations WHERE EventID = ?; `;
      const Squery = `DELETE FROM schedules WHERE EventID = ?; `;
      await mysql.query(Squery, [EventID]);
      await mysql.query(Cquery, [EventID]);
      await mysql.query(Comquery, [EventID]);
      const result = await mysql.query(query, [EventID]);
      //  console.log(result);
      res.status(200).json({ success: "Horse file deleted successfully" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: `Error while deleting Photo in database` });
  }
});

module.exports = router