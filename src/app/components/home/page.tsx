import React from 'react'
import SideBar from '../sideBar/page'
import Image from 'next/image'
import logo from '/public/moneylogo.png'

export default function HomePage() {
  return (
        <>
        <header className='flex justify-between py-4 bg-white'>
            <div className='flex items-center gap-4'>
            <Image src={logo}  alt='로고' className='w-20 h-10'/>
            Money 관리법
            </div>
            <SideBar/>
        </header> 
        <main>
            <section className='py-10 mb-4'>돈좀 모으고 싶다하는 사람들만 주목하세요!!</section>
            <section className='mb-4'>건강한 경제력을 키우는 돈 관리 프로젝트</section>

            <section className='mb-4'>돈이란 무엇인가?</section>

            <section className='mb-4'>가계부, 돈을 관리하는 방법</section>

            <section className='mb-4'>월급으로 1억 모으는 방법</section>

            <section className='mb-4'>주식,코인, 부동산에 대한 정보</section>

            <section className='mb-4'>안전자산(예금, 적금)</section>


            <section className='mb-4'>1억을 모으면 그 다음은....</section>

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
