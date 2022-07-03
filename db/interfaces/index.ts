import { ObjectId } from "mongodb";

export interface Member {
    id?: ObjectId;
    name: string;
    notifications?: Array<Notification>;
    hat: string;
}

export enum ToolType {
    DEVILS_ADVOCAT = "devils_advocat", PLANNING_POKER = "planning_poker"
}

export interface TimeInfo {
    active: boolean,
    time: number
}

export interface Meeting {
    creator?: Member;
    creatorName?: string;
    id?: ObjectId;
    memberId?: ObjectId;
    createdToolId?: ObjectId;
    meetingName: string;
    createdAt: Date;
    done: boolean;
    members: Array<Member>;
    currentTool: string;
    time: TimeInfo;
    debug: boolean;
}

export interface Notification {
    id: ObjectId;
    meetingId: ObjectId;
    receiverId: ObjectId;
    createdAt: Date;
    message: string;
}

export interface Survey {
    question: string,
    creatorName: string,
    choices: Array<string>,
    answers: Array<Answer>
}

export interface Answer {
    memberName: string,
    answer: string
}