import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span>📅</span>
              </div>
              <span>EventHub</span>
            </Link>
            <p className="text-secondary-foreground/70">
              Nền tảng tổ chức và đặt vé sự kiện trực tuyến số 1
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">Sản phẩm</h4>
            <ul className="space-y-2 text-secondary-foreground/70">
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition">
                  Đặt vé
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition">
                  Tạo sự kiện
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition">
                  Quản lý
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="font-semibold">Công ty</h4>
            <ul className="space-y-2 text-secondary-foreground/70">
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-secondary-foreground transition">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold">Liên hệ</h4>
            <ul className="space-y-2 text-secondary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@eventhub.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+84 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-secondary-foreground/70">
          <p>&copy; 2025 EventHub. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
