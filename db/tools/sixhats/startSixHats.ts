import { ObjectId } from "mongodb";
import { collections } from "../../mongodb-client";
import { Meeting, Member } from "../../interfaces"

export async function startSixHats(meetingId: ObjectId): Promise<Meeting> {

    // get the meeting, can't use findandupdateone because we need add dynamic data
    let res = await collections.meetings.findOne({ _id: meetingId })

    // if there was no meeting return an empty object
    if(!!!Object.keys(res ?? {}).length)
        return {} as any

    if(!!res.currentTool)
        return { error: "SixHats is already active" } as any

    // TODO implement other modes and add the data to user data
    // currently only one tool, for future switch
    addHats(res)

    // update the dataset in the db
    // document.save() is not safe, i know that using two requests is bad practice
    res = await collections.meetings.findOneAndUpdate({ _id: meetingId }, {
        $set: {
            members: res.members,
            currentTool: "devils_advocat",
            debug: Math.random() <= 0.34
        }
    },
        {
            returnDocument: "after"
        }) as any

    return res?.value
}

function addHats(res: any) {

    let members = res.members as Array<Member>

    let hats = ["red", "white", "green", "blue", "yellow", "black"]

    for(let member of members) {
        if(!!!hats.length)
            hats = ["red", "white", "green", "blue", "yellow", "black"]

        hats.sort((a, b) => 0.5 - Math.random());

        // fixed random for presentations
        if(res.debug) {
            if(member.name.toLocaleLowerCase() == "janik") {
                member.hat = "red"
                hats = hats.filter(x => x != "red")
                continue
            }
    
            if(member.name.toLocaleLowerCase() == "koutaiba" || member.name.toLocaleLowerCase() == "ko") {
                member.hat = "yellow"
                hats = hats.filter(x => x != "yellow")
                continue
            }

            if(member.name.toLocaleLowerCase() == "vero" || member.name.toLocaleLowerCase() == "veronique" || member.name.toLocaleLowerCase() == "lisa"  || member.name.toLocaleLowerCase() == "chris") {
                member.hat = "black"
                hats = hats.filter(x => x != "black")
                continue
            }
    
            if(member.name.toLocaleLowerCase() == "justin") {
                member.hat = "white"
                hats = hats.filter(x => x != "white")
                continue
            }
    
            if(member.name.toLocaleLowerCase() == "immanuel") {
                member.hat = "blue"
                hats = hats.filter(x => x != "blue")
                continue
            }
    
            if(member.name.toLocaleLowerCase() == "nojo" || member.name.toLocaleLowerCase() == "norman") {
                member.hat = "green"
                hats = hats.filter(x => x != "green")
                continue
            }
        }
        
        member.hat = hats.pop()
    }
}