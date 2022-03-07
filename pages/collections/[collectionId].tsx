import { useRouter } from "next/router";

const Collection = ()=>{
    const router = useRouter();
    return <div>{router.query.collectionId}</div>
}


export default Collection;