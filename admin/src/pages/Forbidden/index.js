import styles from './Forbidden.module.css'

function Forbidden() {
    return <div className={styles.main}>
        <div>
            <p>403 - Bạn không có quyền truy cập nội dung này</p>
        </div>
    </div>
}

export default Forbidden;