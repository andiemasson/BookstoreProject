import { useEffect } from "react";
import { Toast } from "bootstrap";

function ToastNotification({ message, show }: { message: string; show: boolean }) {
    useEffect(() => {
        if (show) {
            const toastEl = document.getElementById('liveToast');
            const toast = new Toast(toastEl!);
            toast.show();
        }
    }, [show]);

    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">Success</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default ToastNotification;