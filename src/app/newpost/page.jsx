"use client";

import { useEffect, useState } from 'react'
import styles from './newPostPage.module.css'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from '@/utils/firebase';

const NewPostPage = () => {
    const [file, setFile] = useState(null);
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [media, setMedia] = useState("");
    const [resume, setResume] = useState("");
    
    useEffect(() =>{
        const storage = getStorage(app);
        const upload = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMedia(downloadURL);
                    });
                }
            );
        };
        file && upload();
    }, [file]);

const slugify = (str) =>
str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, "")
  .replace(/[\s_-]+/g, "-")
  .replace(/^-+|-+$/g, "");

const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
            title,
            resume,
            desc: value,
            img: media,
            slug: slugify(title),
        })
    })
}

return (
    <div className={styles.container}>
        <h1 className={styles.title}>Adicionar novo post</h1>
        <p className={styles.desc}>
            Preencha os campos abaixo para adicionar um novo post ao blog.
        </p>

        <form className={styles.form}>
            <div className={styles.firstRow}>
                <div className={styles.item1}>
                    <h4 className={styles.subtitle}>Data</h4>
                    <input type="date" name="data" id="" required className={styles.input} />
                </div>

                <div className={styles.item2}>
                    <h4 className={styles.subtitle}>Título</h4>
                    <input type="text" name="title" id="" required className={styles.input} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className={styles.item1}>
                    <h4 className={styles.subtitle}>Adicionar imagem</h4>
                    <input type="file" name="title" id="image" required className={styles.input} onChange={(e) => setFile(e.target.files[0])} />
                </div>
            </div>

            <div className={styles.secondRow}>
                <h4 className={styles.subtitle}>Resumo do post</h4>
                <input type="text" name="title" id="" required className={styles.input} onChange={(e) => setResume(e.target.value)} />
            </div>

            <div className={styles.thirdRow}>
                <h4 className={styles.subtitle}>Descrição</h4>
                <textarea name="description" id="" rows="8" required className={styles.input} onChange={(e) => setValue(e.target.value)}></textarea>
            </div>

            <div className={styles.btnContainer}>
                <button className={styles.btn} type='submit' onClick={handleSubmit}>Publicar</button>
            </div>
        </form>
    </div>
)
}

export default NewPostPage