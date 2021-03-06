import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Footer from "../../../components/footer";
import TabArticles from "../../../components/tabs/TabArticles";
import AuthorContent from "../../../components/authors";
import { SERVER_URI } from "../../../constants";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setSearch } from "../../../redux/actions";

export default function Articles({ source }) {
  const [activeTabId, setActiveTabId] = useState(4);
  const router = useRouter();
  const [tabs, setTabs] = useState([
    "Quotes",
    "Books",
    "Interviews",
    "Articles",
    "Gallery",
  ]);

  const dispatch = useDispatch();

  return (
    <>
      <AuthorContent
        source={source}
        metaTitle={source.metaTitle}
        metaDescription={source.metaDescription}
        by={"Article by"}
      />
      <main>
        <section className="container">
          <div className="row tabs-container">
            {tabs.map((tab, i) => {
              return (
                <div
                  key={i}
                  className={activeTabId == i + 1 ? "tab tab__active" : "tab"}
                  data-tab="tab-1"
                  onClick={() => {
                    dispatch(setSearch(""));
                    router.push(`/authors/${source.slug}/${tab.toLowerCase()}`);
                  }}
                >
                  <h3 className="tab-item">{tab}</h3>
                  <span className="tab-item__counter">
                    {source[tab] && source[tab].length}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <TabArticles
          active={activeTabId == 4 ? true : false}
          data={source}
          route={`/authors/${source.slug}/articles`}
        />

        <section className="pb80">
          <div className="banner-container banner-container-728">
            <img src="/assets/google-728.jpg" alt="" className="banner-728d" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const res = await axios.get(SERVER_URI + "/api/sources/" + slug);
  return {
    props: { source: res.data },
  };
}
