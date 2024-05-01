import Error from 'page/error';
export default function Custom403() {
    return <Error 
        http={403} title="Forbidden" 
        description="
            Whoops!!!<br/>
            Du har inte tillgång till att komma åt
            denna sida. Försök igen senare.
        "
    />;
}