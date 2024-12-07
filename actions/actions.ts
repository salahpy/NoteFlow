'use server'

import { adminDb } from "@/firebase-admin";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument(){
const {sessionClaims} = await auth();

// if (!sessionClaims?.email) {
//     RedirectToSignIn({
//         redirectUrl: '/',
//       });
//       return;
//   }


const docCollectionRef = adminDb.collection('documents')
const docRef = await docCollectionRef.add({
    title: 'New Document',
})

await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
userId: sessionClaims?.email!,
role : 'owner',
createdAt: new Date,
roomId : docRef.id
})

return {docId : docRef.id}
}