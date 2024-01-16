import React from 'react'
import SideBar from '../sideBar/page'
import Image from 'next/image'
import logo from '/public/moneylogo.png'
import money from '/public/whatmoney.jpg';
import Passbook from '/public/Passbook.png';
import superrich from '/public/superrich.png';
import realEstate from '/public/realEstate.png';
import saving01 from '/public/saving01.png';
import saving02 from '/public/saving02.png';
import growth from '/public/growth.jpg';

import coin from '/public/coin.png';




export default function HomePage() {
  return (
        <>
        <header className='flex justify-between py-4 bg-white'>
            <div className='flex items-center gap-4'>
            ALIVE-MONEY
            </div>
            <SideBar/>
        </header> 
        <main>
            <section className='py-4 text-center bg-gray-300 '>돈좀 모으고 싶다하는 사람들만 주목하세요!!</section>

            {/* <section className='mb-4'>건강한 경제력을 키우는 돈 관리 프로젝트</section> */}

            <section className='py-4'>
                <h1 className='text-xl text-center'>돈이란 무엇인가?</h1>

            <div className='flex gap-4 mt-4 text-lg'>
            <Image src={money}  alt='돈' className='w-1/5'/>
            <p>
                돈은 교환 매체로 사용되는 통화나 가치를 나타내는 일반적인 용어입니다. 다양한 형태의 돈이 존재하지만, 주로 통용되는 것은 국가에서 발행한 화폐입니다.
                
                돈은 주로 다음과 같은 기능을 수행합니다:
                교환 매체: 돈은 상품이나 서비스와 교환할 때 사용되는 매체로 기능합니다. 사람들은 돈을 사용하여 물건을 사거나 서비스를 받습니다.
                가치의 단위: 돈은 가치의 표시로 사용됩니다. 상품이나 서비스의 가치를 돈의 양으로 나타내어 비교할 수 있습니다.
                저장 수단: 돈은 가치를 저장할 때 사용됩니다. 사람들은 돈을 저축하거나 투자하여 미래에 사용하기 위해 보관합니다.
                계산 단위: 돈은 통화의 형태로 사용되어 거래나 계산을 편리하게 만듭니다. 금전화된 가치의 표시로서 쉽게 계산할 수 있습니다.
                다양한 형태의 돈이 있습니다. 예를 들어, 현금, 은행 소유의 예금, 전자화폐 등이 그 예입니다. 돈은 경제 시스템에서 중요한 역할을 하며, 사회적 교환과 생활의 편의성에 큰 기여를 합니다.
                </p>
            </div>
            
            </section>
            
            <section className='py-4 px-28'>
                <div className='flex gap-20 mt-4 text-lg'>
                <Image src={saving02}  alt='가계부 로고' className='w-1/5'/>
                <div className='flex items-center'>
                        <div>
                            <h2 className='mb-8 text-2xl notoSansKr'><strong>돈 저축 * 가계부로 시작합시다.</strong></h2>
                            <p className='text-xl leading-8'>
                            가계부 정리 뭐 어디서 부터 시작해야되지..?<br />
                            돈 모을라면 가계부 적어야 하나?<br />
                            이러한 분들을 위해 가계부를 쉽게 적어보고, 남들과 함꼐 공유해요!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className='py-4 px-28'>
                <div className='flex gap-20 mt-4 text-lg'>
                    <Image src={growth}  alt='월급 로고' className='w-1/5'/>
                    <div className='flex items-center'>
                        <div>
                            <h2 className='mb-8 text-2xl notoSansKr'><strong>1억을 모을 수 있을까~?</strong></h2>
                            <p className='text-xl leading-8'>
                            1억을 모으면 뭘 하지~?<br />
                            모을 수 있는 방법은?<br />
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-4 px-28'>
                <div className='flex gap-20 mt-4 text-lg'>
                <Image src={Passbook}  alt='통장 로고' className='w-1/5'/>
                    <div className='flex items-center'>
                        <div>
                            <h2 className='mb-8 text-2xl notoSansKr'><strong>적금, 은행에 넣기</strong></h2>
                            <p className='text-xl leading-8'>
                                은행 적금과 예금<br />
                                너무 많은 예/적금이 있는데 뭘 들어야 하지~?<br />
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className='py-4 px-28'>
                <div className='flex gap-20 mt-4 text-lg'>
                    <Image src={coin}  alt='재테크 로고' className='w-1/5'/>
                    <div className='flex items-center'>
                        <div>
                            <h2 className='mb-8 text-2xl notoSansKr'><strong>돈만 생각하면 불안한 마음, 재테크 정보</strong></h2>
                            <p className='text-xl leading-8'>
                            재테크 공부..<br />
                            주식, 부동산, 코인 뭐 부터 시작 해야 할까요?<br />
                            같이 공유하고 공부합시다.<br />
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className='py-4 bg-gray-100'>1억을 모으면 그 다음은....</section>

        </main>
        </>


        /* <div>여기서 웹 사이트의 첫 페이지를 장식한다.</div>

        <div>
            1. 돈이란 무엇인지 정의 해보고
            2. 웝급으로 1억 모으기
            3. 나는 주식, 코인, 부동산을 할꺼다  ( 극히 나의 주관적인 생각으로 추천)
            4, 나는 안전 자산 적극이 최고다 !!!
            5. 1억을 모으면 뭘 할 수 있는지, 나는 어떤 사람들이 되는지...
            6. 우리는 왜 돈을 모으지 못하는가?
            7. 가계부, 돈을 관리하는 방법, 저축, 소비, 습관,,,
            8. 대출은 어떻게 해야되며, 무엇인지 ( 해당 나의 조건에 맞는 대출은 무엇인지)
            9. 욜로족, 아예 다쓴다, 에라이 다 쓰고 말아 ~ 

            이렇듯 돈의 대한 정보와, 우리는 왜 돈을 모아야 하며, 방법, 등등 같이 공부도 하고, 가계부를 이용해 습관화 하자.
            해당 데이터 정보, 이미지를 db에 저장하고, 정보를 전부 저장한다,
            또한 가계부를 사용하면서, 데이터는 전부 db에 저장 해서 관리한다.

            서버  사이드 렌더링과 , 클라이언트 사이드 렌더링을 적절하게 섞어 준다.
            암튼 데이터를 전부 넣어보자
        </div> */
  )
}
