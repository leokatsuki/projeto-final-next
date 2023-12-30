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
import { useRouter } from 'next/navigation';

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
        };

const NewPostPage = () => {
    const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
    const [file, setFile] = useState(null);
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [media, setMedia] = useState("");
    const [resume, setResume] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()

    useEffect(() => {
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
                        setIsFileUploaded(true);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!title || !resume || !value) {
            setErrorMessage('Preencha todos os campos antes de publicar!');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }
        
        if (!isFileUploaded) {
            setErrorMessage('A imagem ainda nao foi carregada!');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

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

        if(res.status === 200){
            router.push("/blog");
        }
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
                        <input
                            type="date"
                            name="date"
                            id=""
                            className={styles.input}
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.item2}>
                        <h4 className={styles.subtitle}>Título</h4>
                        <input
                            type="text"
                            name="title"
                            id=""
                            className={styles.input}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.item1}>
                        <h4 className={styles.subtitle}>Adicionar imagem</h4>
                        <input
                            type="file"
                            name="title"
                            id="image"
                            className={styles.input}
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                    </div>
                </div>

                <div className={styles.secondRow}>
                    <h4 className={styles.subtitle}>Resumo do post</h4>
                    <input
                        type="text"
                        name="title"
                        id=""
                        className={styles.input}
                        onChange={(e) => setResume(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.thirdRow}>
                    <h4 className={styles.subtitle}>Descrição</h4>
                    <textarea
                        name="description"
                        id=""
                        rows="8"
                        required
                        className={styles.input}
                        onChange={(e) => setValue(e.target.value)}
                    ></textarea>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </div>

                <div className={styles.btnContainer}>
                    <button 
                        className={styles.btn} 
                        type='submit' 
                        onClick={handleSubmit}
                        
                    >
                        Publicar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewPostPage