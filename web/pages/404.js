import Error from 'page/error';
export default function Custom404() {
    return <Error 
        http={404} title="Not Found" 
        description="
            Whoops!<br/>
            Den här sidan är inte klar än. 
            Kolla gärna på våra andra tjänster 
            eller ring 123-456-789 gällande 
            kommande tjänster eller vid frågor
        "
    />;
}