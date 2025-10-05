import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-10">
      <Container>
        <div className="py-6 text-center text-sm space-y-2">
          <p>© {new Date().getFullYear()} VATTUKC.COM — Vật tư nông nghiệp thông minh 🌿</p>
          <p>
            <a href="https://vattukc.com" className="underline hover:text-gray-200">
              vattukc.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

