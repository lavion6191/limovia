import Error from 'page/error';
export default function Custom500() {
    return <Error 
        http={500} title="Internal Server Error" 
        description="Something went wrong on the server. <br/>We&rsquo;re working to untangle the furball." 
    />;
}