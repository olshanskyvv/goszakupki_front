import styles from "../styles/ProfileBody.module.css"
import React, { useState } from 'react'
import { isAuthed } from "../utils/auth";
import { Navigate } from "react-router-dom";


export default function ProfileBody(){
    const [isOpen, setIsOpen] = useState(false);
  const [selectedAuthority, setSelectedAuthority] = useState('');
  const [selectedDuty, setSelectedDuty] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [authed, setAuthed] = useState(null)
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSelectAuthority = (event) => {
    setSelectedAuthority(event.target.value)

};
  const handleSelectDuty = (event) => {
    setSelectedDuty(event.target.value)
};
    if (authed === null) {
        isAuthed().then(res => setAuthed(res));
        console.log(user)
    }

  if (authed !== null && authed === false) {
    return <Navigate to='/' replace/>
  }
    return(<>
        <div className={styles.ProfileBody}>
            <div className={styles.leftSide}>
                <p>{user?.surname}</p>
                <p>{user?.name}</p>
                <p>{user?.patronymic}</p>
                <p>{user?.position.title}</p>
                <a href="#">Отобразить дополнительную информацию</a>
            </div>

            <div className="rightSide">
                <button className={styles.ShowBtn} onClick={handleOpen}>
                        Отобразить <br/>
                        Машиночитаемую <br/>
                        Доверенность
                </button>

                {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleClose}>&times;</span>
            <div className={styles.modalBody}>
                <h2>Машиночитаемая доверенность</h2>
                <div>
                <select id="option1" value={selectedAuthority} onChange={handleSelectAuthority}>
                    <option value="">Полномочия</option>
                    {user?.authorities.map(a => <option value={a.id}>{a.header}</option>)}
                </select>
                    <div>{user?.authorities.find(a => a.id == selectedAuthority)?.description}</div>
                </div>
                <div>
                <select id="option2" value={selectedDuty} onChange={handleSelectDuty}>
                    <option value="">Обязанности</option>
                    {user?.dutyList.map(d => <option value={d.id}>{d.header}</option>)}
                </select>
                    <div>{user?.dutyList.find(d => d.id == selectedDuty)?.description}</div>
                </div>
            </div>
          </div>
        </div>
      )}
            </div>
        </div>
        </>
    )
}