import { Group } from "./group";
import { Api } from "../api/api";
import { Contacts } from "./contacts";
import { ContactsBean, UserInfoBean } from "../api/model";
import { map, mergeMap, Observable, of, toArray } from "rxjs";
import { onNext } from "src/rx/next";

export class ContactsList {

    private contacts: Map<number, Contacts> = new Map<number, Contacts>();

    public onContactsChange: () => void | null = null;

    public getContactList(): Observable<Contacts[]> {
        if (this.contacts.size > 0) {
            return of(Array.from(this.contacts.values()));
        }
        return Api.getContacts()
            .pipe(
                mergeMap(contacts => of(...contacts)),
                map(contacts => Contacts.create(contacts)),
                onNext(contacts => {
                    this.contacts.set(contacts.id, contacts);
                }),
                toArray(),
            )
    }

    public setContactsAddListener(listener: () => void | null) {
        this.onContactsChange = listener;
    }

    public addFriend(uid: number, remark?: string): Promise<ContactsBean> {
        console.log("ContactsList/addFriend", uid, remark);

        return Api.addContacts(uid)
    }


    public getGroup(gid): Group | null {
        return null
    }

    public getFriend(uid): UserInfoBean | null {
        return null
    }

    public getAllGroup(): Group[] {
        return []
    }

    public getAllFriend(): UserInfoBean[] {
        return []
    }

    public getAllContacts(): Contacts[] {
        const ret: Contacts[] = [];
        // for (let userInfo of this.getAllFriend()) {
        //     ret.push({Avatar: userInfo.Avatar, Id: userInfo.Uid, Name: userInfo.Nickname, Type: 1})
        // }
        // for (let group of this.getAllGroup()) {
        //     ret.push({Avatar: group.Avatar, Id: group.Gid, Name: group.Name, Type: 2})
        // }
        return ret
    }

    public clear() {

    }

}

export const IMContactsList = new ContactsList();
