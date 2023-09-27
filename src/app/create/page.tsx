import CreatePhotoForm from "../components/CreatePhotoForm";

export default function Create() {
    return (
        <div className="pt-4 px-16 pb-16 flex flex-col gap-4">
            <h2>Upload a photograph</h2>
            <p>Please fill out your photograph details</p>
            <CreatePhotoForm />
        </div>
        
    );
}
