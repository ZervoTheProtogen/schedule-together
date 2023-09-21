
// TODO: Rewrite to TypeScript

export default function getStatus(url) {
    var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState === 4){
        request.status;//this contains the status code
    }
};
request.open("GET", url , true);
request.send(null);
}