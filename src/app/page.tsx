import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-1">
        <Container>
          <Banner />
          <Categories />
          <FeaturedProducts />
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

