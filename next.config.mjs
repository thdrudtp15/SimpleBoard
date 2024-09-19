/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '', // 포트가 기본 포트(HTTP 80, HTTPS 443)라면 비워 둡니다.
        pathname: '/a/**', // 허용할 이미지 경로 패턴 (예: `/a/`로 시작하는 경로)
      },
    ],
  },
}

export default nextConfig
