import './modal.css'
export const Modal = ({ children }) => {
    return (
        <div className="modal-container">
            {children}
        </div>
    )
}