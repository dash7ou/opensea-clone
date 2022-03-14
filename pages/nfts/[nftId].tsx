import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const NFT = ()=>{
    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState<any>()
    const [listings, setListings] = useState<any>([])
    const router = useRouter()

    const nftModule = useMemo(() => {
        if (!provider) return
    
        const sdk = new ThirdwebSDK(
          'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
        )
        return sdk.getNFTModule('0x3f259bA93fce23e7F127A888F246F4e06D4b1655')
    }, [provider])


      // get all NFTs in the collection
    useEffect(() => {
        if (!nftModule) return
        ;(async () => {
            const nfts = await nftModule.getAll()

            const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)

            setSelectedNft(selectedNftItem)
        })()
    }, [nftModule])
      

    const marketPlaceModule = useMemo(() => {
        if (!provider) return
    
        const sdk = new ThirdwebSDK(
          'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
        )
    
        return sdk.getMarketplaceModule(
          '0xA218214c012b1E2F5E7E62A916CFc0495DADF17A'
        )
      }, [provider])
    
      useEffect(() => {
        if (!marketPlaceModule) return
        ;(async () => {
          setListings(await marketPlaceModule.getAllListings())
        })()
      }, [marketPlaceModule])


    return(
        <div>
        <Header />
        <div className={style.wrapper}>
          <div className={style.container}>
            <div className={style.topContent}>
              <div className={style.nftImgContainer}>
                <NFTImage selectedNft={selectedNft} />
              </div>
              <div className={style.detailsContainer}>
                <GeneralDetails selectedNft={selectedNft} />
                <Purchase
                  isListed={router.query.isListed}
                  selectedNft={selectedNft}
                  listings={listings}
                  marketPlaceModule={marketPlaceModule}
                />
              </div>
            </div>
            <ItemActivity />
          </div>
        </div>
      </div>
    )
}


export default NFT;