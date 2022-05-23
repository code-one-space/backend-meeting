const axios = require("axios")
const { MeetingId } = require("../config").config

test("Get all meetings from database", async () => {
    let data = await axios.get("https://sep-nojo-test.azurewebsites.net/api/meetings/")
    data = data.data
    expect(data.length).not.toBe(0);
})

test("Get specific meeting by id from database", async () => {
    meeting = await axios.get(`https://sep-nojo-test.azurewebsites.net/api/meetings/${ MeetingId }`)
    expect(Object.keys(meeting).length).not.toBe(0);
})
