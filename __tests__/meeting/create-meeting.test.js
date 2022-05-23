const axios = require("axios")
const { MeetingId } = require("../config").config

let createdMeeting = null
test("Create a meeting with name [[DEV] Backend Test-Meeting] for member [Definitely not Nojo]", async () => {

    let json = JSON.stringify({ name: "[DEV] Backend Test-Meeting", owner: { name: "Definitely not Nojo" }})

    let meeting = await axios.post("https://sep-nojo-test.azurewebsites.net/api/meetings", json, 
        { headers: {'Content-Type': 'application/json'} })
    meeting = meeting.data

    createdMeeting = meeting

    expect(meeting.members).toEqual(expect.arrayContaining([expect.objectContaining({ name: "Definitely not Nojo" })]))
    expect(meeting.name).toEqual("[DEV] Backend Test-Meeting")
})

test("Delete a meeting with name [[DEV] Backend Test-Meeting] by leaving with only member [Definitely not Nojo]", async () => {

    // leave the meeting for Meow Deow
    let meetingDetails = JSON.stringify({ meetingId: createdMeeting._id, memberId: createdMeeting.members[0].id })
    await axios.post("https://sep-nojo-test.azurewebsites.net/api/meetings/leave", meetingDetails, 
        { headers: {'Content-Type': 'application/json'} })
    
    // check if meeting has really been left
    let deletedMeeting = await axios.get(`https://sep-nojo-test.azurewebsites.net/api/meetings/${ createdMeeting._id }`)
    deletedMeeting = deletedMeeting.data

    // server responds with empty string if no object was found
    expect(deletedMeeting).toEqual("")
})