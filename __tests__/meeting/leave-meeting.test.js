const axios = require("axios")
const { MeetingId, MemberId } = require("../config").config

test("Leave the test meeting with a member called [Meow Deow]", async () => {

    // add user called Meow Deow
    let userToAdd = JSON.stringify({ meetingId: MeetingId, memberName: "Meow Deow" })
    await axios.post("https://sep-nojo-test.azurewebsites.net/api/meetings/join", userToAdd, 
        { headers: {'Content-Type': 'application/json'} })

    // request the meeting
    meeting = await axios.get(`https://sep-nojo-test.azurewebsites.net/api/meetings/${ MeetingId }`)
    meeting = meeting.data

    // find Meow Deow for id in response
    let user = meeting.members.filter(member => member.name == "Meow Deow")[0]

    // inserting Meow Deow failed
    if(Object.keys(user).length == 0)
        throw "No user in db named [Meow Deow]"

    // leave the meeting for Meow Deow
    let json = JSON.stringify({ meetingId: MeetingId, memberId: user.id })
    await axios.post("https://sep-nojo-test.azurewebsites.net/api/meetings/leave", json, 
        { headers: {'Content-Type': 'application/json'} })
    
    // check if meeting has really been left
    meeting = await axios.get(`https://sep-nojo-test.azurewebsites.net/api/meetings/${ MeetingId }`)
    meeting = meeting.data

    expect(meeting.members).not.toEqual(expect.arrayContaining([expect.objectContaining({ name: "Meow Deow" })]))
})