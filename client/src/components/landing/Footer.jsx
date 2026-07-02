import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black">Traction</h3>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Build traction. Every day.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>

            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li>Features</li>
              <li>Analytics</li>
              <li>Achievements</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>

            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li>About</li>
              <li>Contact</li>
              <li>Support</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>

            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Traction. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
