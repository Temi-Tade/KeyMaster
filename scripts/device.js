const CHECK_DEVICE = () =>{
    if (window.innerWidth > 768 && (navigator.userAgent.toLowerCase().includes("x11") || navigator.userAgent.toLowerCase().includes("windows") || navigator.userAgent.toLowerCase().includes("macintosh"))) {
        return
    }else{
        CREATE_MODAL(`
                <h2>Oops. Device not supported</h2>
                <p>It seems like you are using a mobile device. Please view this page with a laptop or desktop computer</p>
            `
        )
    }
}

CHECK_DEVICE()