
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, where, query, deleteDoc, doc, setDoc} from "firebase/firestore"; 
import { Text, Alert, Keyboard, SafeAreaView } from 'react-native'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyCKk_hrfuAvkMgHMUFDPdI5rPTmxaUSvz4",

  authDomain: "projet-native-eanp.firebaseapp.com",

  projectId: "projet-native-eanp",

  storageBucket: "projet-native-eanp.appspot.com",

  messagingSenderId: "943510989022",

  appId: "1:943510989022:web:5d9284ef94d60ed4c97a4f"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export function createUser(mail, pass) {
    return new Promise((res, rej) => {
        createUserWithEmailAndPassword(auth, mail, pass)
        .then((userCredential) => {
            res(userCredential.user);
        })
        .catch((error) => {
            rej(error)
        });
    })
}

export function connectUser(mail, pass) {
    return new Promise((res, rej) => {
        signInWithEmailAndPassword(auth, mail, pass)
        .then((userCredential) => {
            res(userCredential.user);
        })
        .catch((error) => {
            rej(error)
        });
    })
}


export function suppUser(user) {
    return new Promise((res, rej) => {
        deleteUser(user).then(() => {
            res(true)
        }).catch((error) => {
            rej(error)
        });
    })
}

const db = getFirestore(app);

export async function getProjects(){
    const querySnapshot = await getDocs(collection(db, "projects"));
    let ret = []

    querySnapshot.forEach((doc) => {
        ret.push([doc.id, doc.data().name])
    });

    return ret

}

export async function getColumnsFromProject(projectId){
    
    const q = query(collection(db, "columns"), where("project", "==", projectId));
    let ret = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

        ret.push([doc.id, doc.data().name])
    });

    return ret
}

export async function getTasksFromColumns(columnId){
    
    const q = query(collection(db, "tasks"), where("column", "==", columnId));
    let ret = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

        ret.push([doc.id, doc.data().content, doc.data().uri])
    });

    return ret
}

export async function deleteTask(id){
    
    await deleteDoc(doc(db, "tasks", id));
}

export async function deleteColumn(id){
    await deleteDoc(doc(db, "columns", id));
}

export async function addColumn(name, projectId){
    
    await addDoc(collection(db, "columns"), {
        name: name,
        project: projectId
    });
}

export async function addTask(content, columnId){
    
    await addDoc(collection(db, "tasks"), {
        content: content,
        column: columnId
    });
}

export async function editColumn(name, id){
    
    await setDoc(doc(db, "columns", id), {
        name: name
    },{ merge: true });
}

export async function editTask(content, id){
    
    await setDoc(doc(db, "tasks", id), {
        content: content
    },{ merge: true });
}

export async function addProject(name){
    
    await addDoc(collection(db, "projects"), {
        name: name,
    });
}

export async function editTaskImage(uri, id){
    
    await setDoc(doc(db, "tasks", id), {
        uri: uri
    },{ merge: true });
}