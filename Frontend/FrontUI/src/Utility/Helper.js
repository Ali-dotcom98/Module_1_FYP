import axios from "axios";
import moment from "moment"
import html2canvas from "html2canvas";


// const UploadImage = async (imageFile) => {
//     const formData = new FormData();
//     formData.append('image', imageFile);
//     try {
//         const response = await axios.post("http://localhost:3000/api/auth/uploadImg", formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             }
//         )

//         return response.data
//     } catch (error) {
//         console.log("Error uploading the image", error);

//     }
// }
// export default UploadImage

// Eg: Mar 2025
export function formatYearMonth(yearMonth) {
    return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}


export const fixTailwindColors = (element) => {
    const elements = element.querySelectorAll("*");
    elements.forEach((el) => {
        const style = window.getComputedStyle(el);
        ["color", "backgroundColor", "borderColor"].forEach((prop) => {
            const value = style[prop];
            if (value.includes("oklch")) {
                el.style[prop] = "#000"; // or any safe fallback
            }
        });
    });
};
// Convert component to image
export async function captureElementAsImage(element) {
    if (!element) throw new Error("No element provided");
    const canvas = await html2canvas(element);
    return canvas.toDataURL("image/png");
}

// Utility to convert base64 data URL to a File object
export const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
};
