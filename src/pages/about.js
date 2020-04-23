import React from 'react'
import Head from 'next/head'
import { DivAbout } from '../styles'

import Layout from '../components/Layout'

export default function About() {
  return (
    <React.Fragment>
      <Head>
        <title>About Page</title>
      </Head>

      <Layout>
        <DivAbout>
          <p>
            <img src="/img/logo.webp" alt="logo" className="img-tumbnail" />
            Alimazon company is the largest company in the world! After we've bought Google, Facebook, Apple and Microsoft there are no rivals left for us :) Ah, this sweet sweet taste of monopoly... we can do whatever we want and people still will give us their money! :)
            <br /> 
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere tempore rerum optio aliquam dolorem pariatur inventore nobis, maiores, nulla tenetur libero dolorum quisquam iste voluptate obcaecati possimus quod praesentium? Harum! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore natus dignissimos sunt provident? Impedit repellat vitae unde magni dolorum, beatae, quae veniam cupiditate sunt tempora odio iusto autem modi necessitatibus?
          </p>
          <p>
            <img src="/img/owner.webp" alt="owner" className="img-tumbnail" />
            The CEO of Alimazon is Mr. John Doe - he is the richest man in the world! He is also the most successful businessman alive! Nobody knows whether he pays his taxes, but you gotta admit - he looks damn good in that suit. ;)
            <br /> 
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id laborum autem et rerum voluptatibus ipsum eum, iusto quisquam error iure dolore dicta mollitia deleniti tempora modi nam ut necessitatibus eveniet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vero ratione quo fugit libero! Perspiciatis repellat sed eligendi eius quia mollitia, cum facilis magnam, inventore quam nihil deserunt officiis natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consequatur dicta harum delectus doloremque saepe nihil corrupti dolor esse veritatis labore vel officia quia vitae, rem ab recusandae aliquid explicabo! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam laudantium, unde, rem assumenda fuga possimus alias dolor accusamus perferendis, sunt at dolores! Asperiores, repudiandae ea tempora natus quod quas temporibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, dignissimos! Commodi ea eaque voluptate libero veritatis rem ratione placeat earum. Rem omnis at ipsam ea repellat eum eos, nam architecto! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, accusamus quibusdam ipsam modi unde facere assumenda ea atque natus, distinctio quasi ipsa laborum incidunt repellendus neque esse officia. Magni, fugit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui cupiditate corporis dolores neque non error inventore, nulla commodi fuga. Omnis possimus nihil aliquam eum labore libero nesciunt, consequuntur mollitia. Quis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque modi est nesciunt consectetur minus eos quis culpa rerum, aliquid, exercitationem animi quas magnam aperiam ex delectus a. Cumque, quia quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam est doloremque pariatur recusandae officiis autem itaque excepturi, ad illum aperiam tenetur, laboriosam dolorem id consequuntur velit cumque cum delectus corrupti!
          </p>
        </DivAbout>
      </Layout>
    </React.Fragment>
  )
}
