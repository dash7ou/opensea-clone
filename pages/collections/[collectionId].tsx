import { useEffect, useMemo, useState} from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { useRouter } from "next/router";
import { client } from "../../lib/sanityClient";
import { ThirdwebSDK, NFTMetadata,AuctionListing, DirectListing } from '@3rdweb/sdk';


const style = {
    bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-44`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
    socialIcon: `my-2`,
    divider: `border-r-2`,
    title: `text-5xl font-bold mb-4`,
    createdBy: `text-lg mb-4`,
    statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
    statValue: `text-3xl font-bold w-full flex items-center justify-center`,
    ethLogo: `h-6 mr-2`,
    statName: `text-lg w-full text-center mt-1`,
    description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}


const Collection = ()=>{
    const router = useRouter();
    const { provider } = useWeb3();
    const collectionId = router.query.collectionId as string;
    const [collection,setCollection] = useState([]);
    const [nfts, setNfts] = useState<NFTMetadata[]>([]);
    const [listings, setListings] = useState<(AuctionListing | DirectListing)[]>([]);

    const nftModule = useMemo(()=>{
        if (!provider) return

        const sdk = new ThirdwebSDK(
            // provider.getSigner(),
            "https://eth-rinkeby.alchemyapi.io/v2/TioWeVdm2fR4hD7cHGO1jypXhq-AoOdK",
        )

        return sdk.getNFTModule(collectionId)
    }, [provider])


    useEffect(()=>{
        if(!nftModule) return;

        (async()=>{
            const nfts = await nftModule.getAll();
            console.log(nfts)
            setNfts(nfts);
        })()
    }, [nftModule]);

    const marketPlaceModule = useMemo(()=>{
        if(!provider) return;

        const sdk = new ThirdwebSDK(
            // provider.getSigner(),
            "https://eth-rinkeby.alchemyapi.io/v2/TioWeVdm2fR4hD7cHGO1jypXhq-AoOdK"
        )


        return sdk.getMarketplaceModule(
            "0xA218214c012b1E2F5E7E62A916CFc0495DADF17A"
        )
    
    }, [provider])


    useEffect(()=>{

        if(!marketPlaceModule) return;

        (async ()=>{
            try{
            const listings = await marketPlaceModule.getAllListings()

            console.log(listings)
           setListings(listings) 
            }catch(err){
                console.log(err)
            }
        })()
    }, [marketPlaceModule])


    useEffect(()=>{
        fetchCollectionData()
    }, [collectionId])

    const fetchCollectionData = async (sanityClient = client) => {
        const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
          "imageUrl": profileImage.asset->url,
          "bannerImageUrl": bannerImage.asset->url,
          volumeTraded,
          createdBy,
          contractAddress,
          "creator": createdBy->userName,
          title, floorPrice,
          "allOwners": owners[]->,
          description
        }`
    
        const collectionData = await sanityClient.fetch(query)
    
        console.log(collectionData, '🔥')
    
        // the query returns 1 object inside of an array
        await setCollection(collectionData[0])
      }

    return <div>{router.query.collectionId}</div>
}


export default Collection;