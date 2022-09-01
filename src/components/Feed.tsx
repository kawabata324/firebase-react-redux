import React, {useState, useEffect} from "react"
import {db,} from "../firebase/firebase"
import TweetInput from "./TweetInput";
import styles from "./Feed.module.css"
import {doc, onSnapshot, query, collection} from "firebase/firestore";

const Feed: React.FC = () => {
    const [posts, setPosts] = useState([
        {
            id: "",
            avatar: "",
            image: "",
            text: "",
            timestamp: null,
            username: ""
        }
    ])

    useEffect(() => {
        // Todo timeStamp 順に並ぶように修正する
        const q = query(collection(db, "posts"))
        const unSub = onSnapshot(q, (doc) => {
            const dataLists = doc.docChanges().map((change) => {
                const {avatar, image, text, timestamp, username} = change.doc.data()
                return {
                    id: change.doc.id,
                    avatar,
                    image,
                    text,
                    timestamp,
                    username
                }
            });
            setPosts(dataLists)
        })

        return () => {
            unSub()
        }
    }, [])
    return (
        <div className={styles.feed}>
            <TweetInput/>
            {posts.map((post)=> (
                <h3>{post.id}</h3>
            ))}
        </div>
    )
}

export default Feed