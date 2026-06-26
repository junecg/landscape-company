# Review UI/UX — Lapla Landscape

Đánh giá toàn site về **chữ (copy), font chữ và design**, kèm khuyến nghị ưu tiên. Phần home page các lỗi rõ ràng đã được sửa trực tiếp trong code (xem mục cuối). Các mục còn lại là khuyến nghị — chưa đụng vào code.

Phạm vi review: hệ thống typography toàn cục (`globals.css`, `layout.tsx`), toàn bộ section của home page (đọc kỹ từng component), các shared component (Navbar, Footer, PageHero) và cấu trúc các trang con (about, services, news, projects, partners, careers, catalog). Lưu ý: không render được giao diện thật trong môi trường này nên đánh giá dựa trên code + design tokens; nên kiểm tra lại trực quan bằng `npm run dev`.

---

## 1. Font chữ — vấn đề hệ thống lớn nhất

Site đang nạp **4 bộ font Google** cùng lúc: Bricolage Grotesque, Plus Jakarta Sans, Public Sans, Be Vietnam Pro. Có 2 vấn đề nghiêm trọng:

**a) Heading dùng 2 font khác nhau tùy component.** Trong `globals.css`, quy tắc `h1..h6` mặc định gán **Plus Jakarta Sans**, nhưng class `font-display` lại trỏ tới **Bricolage**. Kết quả: heading nào có class `font-display` thì ra Bricolage, heading nào không có thì ra Plus Jakarta. Khảo sát thực tế: **38/54 heading trên site KHÔNG có `font-display`** → tức phần lớn tiêu đề đang chạy Plus Jakarta, lệch với số ít dùng Bricolage. Ngay tại home, hero `<h1>` trước đây không có `font-display` (đã sửa) trong khi các section About/Services/Process đều có — nên hero lệch font so với toàn trang trên bản tiếng Anh.

**b) Trên bản tiếng Việt (`/vi` — locale mặc định), toàn bộ Bricolage / Plus Jakarta / Public Sans đều bị override thành Be Vietnam Pro.** Nghĩa là 3 bộ font kia gần như **không bao giờ hiển thị** trên site tiếng Việt, nhưng vẫn bị tải về (nhiều weight) → lãng phí băng thông, chậm tải, hại điểm Lighthouse. Thực chất site VN chỉ chạy 1 font duy nhất.

**Khuyến nghị:**
- Thống nhất 1 font heading duy nhất. Theo DESIGN_SYSTEM.md hướng là Bricolage → sửa quy tắc `h1..h6` trong `globals.css` dùng `var(--font-display)` thay cho `--font-plus-jakarta`, rồi **bỏ hẳn Plus Jakarta**.
- Cân nhắc bỏ luôn cả Public Sans nếu site chủ yếu phục vụ khách VN (Be Vietnam Pro đã lo cả body lẫn heading rất tốt và hỗ trợ dấu tiếng Việt đầy đủ). Giữ tối đa 2 font: 1 heading + 1 body.
- Sau khi gọn font, kiểm tra lại cân chỉnh `letter-spacing: -0.02em` ở heading — giá trị này hợp với font hình học (Bricolage/Jakarta) nhưng hơi chặt với Be Vietnam Pro tiếng Việt có dấu; nên giảm còn khoảng `-0.01em` cho `html[lang="vi"]`.

---

## 2. Chữ / Copy (nội dung)

Nhìn chung copy song ngữ VI/EN đầy đủ, giọng văn chuyên nghiệp, thống nhất thương hiệu "Lapla". Một số điểm cần xử lý:

- **Avatar giả ở section Quy trình (ProcessSection).** Đang dùng `i.pravatar.cc/100?img=...` — ảnh khuôn mặt ngẫu nhiên của dịch vụ stock, đặt cạnh câu "Bạn đã sẵn sàng…". Người dùng tinh ý sẽ nhận ra đây là người thật ngẫu nhiên không liên quan. Nên thay bằng ảnh khách hàng/đội ngũ thật, hoặc đổi thành cụm avatar hình hoạ/biểu tượng, hoặc bỏ.
- **Thông tin liên hệ cần rà lại tính nhất quán.** Footer ghi giờ làm "Thứ 2–Thứ 6: 8.00am–6.00pm, Thứ 7: 8.00am–5.00pm"; các nơi khác dùng SĐT `0236 3695 166` và email `info@lapla.com.vn`, địa chỉ Đà Nẵng — cần xác nhận đây là thông tin chính thức (file CLAUDE.md vẫn còn tên dự án cũ "FAM Landscape", và Footer link tới Facebook/Instagram "FAM Flower and More" — có thể là thương hiệu cũ, nên đồng bộ lại với "Lapla").
- **Liên kết Terms & Privacy ở Footer** đang trỏ về trang chủ (`/${locale}`) thay vì trang điều khoản/bảo mật thật → link "chết" về mặt nội dung.
- **Một vài tiêu đề tiếng Anh chưa chuẩn ngữ pháp** (do gốc template Leafix): ví dụ "We Are the Largest Independent Landscaping Company" là khẳng định mạnh ("lớn nhất") — cân nhắc làm mềm để tránh rủi ro quảng cáo quá mức.
- **Mô tả (meta description) & title** ổn nhưng nên bổ sung Open Graph image, `metadataBase`, và title theo từng trang con (hiện chỉ có title chung ở layout).

---

## 3. Design & UI/UX — theo từng khu vực

### Navbar
- **Mọi mục menu đều có icon mũi tên xuống (▾)** gợi ý có dropdown, nhưng **không mục nào có dropdown thật**. Đây là tín hiệu sai lệch với người dùng. Nên bỏ chevron, hoặc thực sự thêm mega-menu (như Leafix làm cho Home/Pages/Service/Blog).
- 7 mục menu (Trang chủ, Dự án, Dịch vụ, Tin tức, Catalog, Tuyển dụng, Về chúng tôi) hơi nhiều cho 1 hàng — ổn ở màn rộng nhưng nên kiểm tra ở 1280px xem có chật không.
- Nav trong suốt trên nền hero rồi chuyển xanh khi cuộn — xử lý tốt. Chỉ cần đảm bảo độ tương phản chữ trắng trên hero ở những slide ảnh sáng (overlay hiện 0.50→0.25, ở slide sáng góc phải có thể đọc khó).

### Hero
- Trước đây chỉ có **1 nút CTA** ("Xem dự án") trong khi bố cục mô phỏng Leafix vốn có 2 nút. Đã thêm nút phụ "Yêu cầu báo giá" (đã sửa).
- Hiệu ứng chữ hiện đẹp (reveal từng cụm từ + gradient trắng→lime). Lưu ý: gradient `WebkitTextFillColor: transparent` nếu trình duyệt cũ không hỗ trợ sẽ ra chữ vô hình — nên có fallback màu trắng.
- `marginTop: -82px` để kéo hero lên dưới navbar, nhưng navbar cao `76px` → lệch 6px. Nên đồng bộ con số.

### Thứ tự các section (narrative)
- Thứ tự cũ: Hero → **Dự án** → Giới thiệu → Dịch vụ → Quy trình → Hệ sinh thái → Đối tác. Đưa "Dự án" lên ngay sau hero, trước cả phần giới thiệu công ty, làm mạch kể yếu (khách chưa biết bạn là ai đã xem dự án).
- Đã đổi sang mạch chuẩn hơn (đã sửa): Hero → Giới thiệu → Dịch vụ → Quy trình → Dự án → Hệ sinh thái → **Cảm nhận khách hàng** → Đối tác → **Liên hệ/Báo giá** → Footer.

### Lỗi nghiêm trọng: nút "Yêu cầu báo giá" trỏ tới `#contact` không tồn tại
- `id="contact"` chỉ nằm trong `CTASection`, nhưng component này **được import mà không được render** trên home. Hệ quả: **mọi nút** "Yêu cầu báo giá" (Navbar, Footer), "Liên hệ ngay" (Process, CTA) trỏ tới `/#contact` đều **không nhảy tới đâu cả** — anchor chết. Đồng thời home **thiếu hẳn form liên hệ/báo giá** (vốn là section quan trọng nhất để chuyển đổi). Đã sửa bằng cách render `CTASection` cuối trang (đã sửa).

### Các section content
- **Dịch vụ / Dự án / Hệ sinh thái:** card design tốt, bo góc lớn (24–30px), hover nâng + đổ bóng xanh nhất quán. Tốt.
- **Hệ sinh thái (MemberCompanies):** bento grid + modal đẹp. Một chỗ kỹ thuật: card thường dùng `addEventListener` trực tiếp trong `ref` callback để làm hiệu ứng thanh gradient — dễ gây memory leak (không remove listener) và lặp khi re-render. Nên chuyển sang CSS `:hover` hoặc state.
- **Cảm nhận khách hàng (Testimonials):** component có sẵn, chất lượng tốt, nhưng trước đây **không được dùng** trên home → đã thêm vào (đã sửa). Lưu ý ảnh avatar đang lấy từ ảnh cảnh quan (Cloudinary) chứ không phải ảnh người — nên thay bằng chân dung thật.
- **Decorative shapes** (lá, chậu cây float) dùng nhiều ảnh PNG + animation — kiểm tra tổng dung lượng ảnh trang trí, cân nhắc lazy-load để không ảnh hưởng LCP.

### Footer
- Cấu trúc rõ ràng, 3 cột + social. Vấn đề: link Terms/Privacy trỏ về home (xem mục 2); social trỏ về thương hiệu "FAM" (xem mục 2).

---

## 4. Các trang con (cần review trực quan thêm)

Các trang con dùng chung `PageHero` (eyebrow + tiêu đề + breadcrumb trên ảnh nền tối) — nhất quán, tốt. Vì phần lớn heading trang con **không có `font-display`**, vấn đề font ở mục 1 ảnh hưởng tất cả các trang này trên bản tiếng Anh. Khuyến nghị review trực quan riêng cho: about, services, news (+ chi tiết), projects (+ chi tiết, flipbook), partners, careers, catalog — đặc biệt kiểm tra: cỡ chữ tiêu đề trên mobile (clamp min ~1.6rem có thể vẫn lớn ở 360px), khoảng cách section (đang cố định 120px desktop / 60px mobile), và độ dài dòng body (nên giới hạn ~70 ký tự).

---

## 5. Khuyến nghị theo thứ tự ưu tiên

**Đã sửa (home page, trong code):**
1. Render `CTASection` trên home → khôi phục toàn bộ nút "Yêu cầu báo giá"/"Liên hệ ngay" + bổ sung form liên hệ.
2. Thêm `TestimonialsSection` vào home (vốn bị bỏ quên).
3. Sắp xếp lại thứ tự section theo mạch kể chuẩn.
4. Thêm nút CTA phụ "Yêu cầu báo giá" ở hero.
5. Thêm `font-display` cho hero `<h1>` để đồng bộ font heading trên home.

**Nên làm tiếp (ưu tiên cao → thấp):**
1. **Dọn hệ thống font** (mục 1): thống nhất 1 heading font, bỏ Plus Jakarta (+ cân nhắc Public Sans). Tác động lớn tới cả tính nhất quán lẫn tốc độ.
2. **Bỏ chevron giả ở Navbar** hoặc làm dropdown thật.
3. **Sửa link chết:** Terms/Privacy ở Footer; đồng bộ social & thông tin liên hệ về thương hiệu Lapla.
4. **Thay avatar giả** (pravatar ở Process, ảnh cảnh quan ở Testimonials) bằng ảnh thật.
5. **SEO/meta:** title theo từng trang, Open Graph image, `metadataBase`.
6. **Kỹ thuật:** refactor hiệu ứng hover ở MemberCompanies về CS/state; lazy-load ảnh trang trí; fallback màu cho hero gradient text.
7. **Review trực quan mobile** toàn bộ trang con (cỡ chữ, spacing, độ dài dòng).

---

## 6. Cập nhật code đã áp dụng (đợt 2)

Sau khi chốt review, các fix sau đã được thực hiện trực tiếp trong code (đã qua `tsc` + `eslint`, 0 lỗi):

1. **Thống nhất font heading về Bricolage.** `globals.css`: quy tắc `h1..h6` đổi từ Plus Jakarta sang `var(--font-bricolage)`. Nhờ vậy **toàn bộ heading trên mọi trang** (kể cả 38 heading không có class `font-display`) giờ dùng chung 1 font trên bản tiếng Anh — hết tình trạng lệch font.
2. **Gỡ bỏ Plus Jakarta Sans** khỏi `layout.tsx` (import + biến + className) — bớt 1 bộ font tải thừa.
3. **Nới `letter-spacing` heading tiếng Việt** còn `-0.01em` để chữ có dấu không bị chật.
4. **Bỏ chevron giả ở Navbar** — gỡ icon mũi tên xuống gợi ý dropdown không tồn tại.
5. **Thay avatar giả ở ProcessSection** (ảnh `pravatar` ngẫu nhiên) bằng cụm badge tròn màu thương hiệu có icon lá.
6. **Đồng bộ `marginTop` hero** `-82px` → `-76px` khớp chiều cao navbar.

(Đợt 1 trước đó: render `CTASection` + `TestimonialsSection` trên home, sắp lại thứ tự section, thêm CTA phụ ở hero, thêm `font-display` cho hero h1.)

---

## 7. Review từng trang con

Tất cả trang con (trừ catalog) dùng chung `PageHero` + `Navbar` + `Footer`, copy song ngữ đầy đủ, mạch thiết kế nhất quán. Đánh giá riêng:

### About (`/about` → AboutPageContent)
- Nội dung phong phú (timeline, giá trị, hệ sinh thái…), thiết kế tốt.
- **Eyebrow không nhất quán ngay trong cùng trang:** một số dùng `text-lg` (18px) (dòng 371, 625, 742), số khác `text-xs` (12px) (dòng 862, 956). Nên thống nhất tất cả eyebrow về 1 cỡ (gợi ý `text-sm`/13–14px như home).
- File rất dài (1015 dòng) — cân nhắc tách nhỏ thành các section component để dễ bảo trì.

### Services (`/services` → ServicesPageContent)
- Layout xen kẽ trái/phải theo số thứ tự — đẹp, rõ ràng.
- **Eyebrow `text-lg` (18px) quá lớn** so với vai trò nhãn phụ; nên giảm còn ~13–14px cho đồng bộ với toàn site.
- Ảnh service dùng thẻ `<img>` thường thay vì `next/image` (dòng 67) → mất tối ưu ảnh; nên đổi sang `Image`.
- CTA "Liên hệ tư vấn" trỏ `#contact` — giờ đã hoạt động nhờ home có CTASection.

### News (`/news` → NewsGrid)
- Layout featured + grid 3 cột đẹp, có category badge, ngày, thời lượng đọc.
- **Rủi ro trang trắng:** `if (!articles.length) return null` — nếu API lỗi/không có bài, vùng dưới hero **trống trơn**, không có skeleton/empty-state. Nên thêm trạng thái rỗng (như ProjectsGrid đã làm).

### Projects (`/projects` → ProjectsGrid)
- Tốt nhất trong nhóm: có filter theo danh mục, skeleton loading, empty-state, animation framer-motion mượt.
- **Lỗi copy nhỏ:** danh mục `Artwork` hiển thị VI = "Nghệ thuật" nhưng EN = "And More" — hai nhãn lệch nghĩa, nên đồng bộ.

### Partners (`/partners` → PartnersSection)
- Card + modal chi tiết (sector, năm thành lập, HQ, dự án tiêu biểu) rất chỉn chu.

### Careers (`/careers` → CareersPageContent)
- Đầy đủ: văn hóa, vị trí tuyển dụng, form ứng tuyển, liên hệ `hr@lapla.com.vn`. Tốt.
- **Quy ước cỡ tiêu đề khác phần còn lại:** dùng `text-3xl md:text-5xl` (Tailwind) thay vì `clamp(...)` inline như home/about. Không lỗi nhưng nên chọn 1 chuẩn responsive heading dùng chung toàn site.

### Catalog (`/catalog` → CatalogViewer)
- Trình xem flipbook toàn màn hình, không Navbar/Footer (chủ đích). Chữ monospace trang trí hợp ngữ cảnh. Chỉ cần đảm bảo nút quay lại "Dự án" góc trên đủ rõ.

### Tổng kết trang con
Hai việc nên làm tiếp: (1) **chuẩn hóa cỡ eyebrow & cách set cỡ heading** (clamp vs Tailwind) thành 1 quy ước dùng chung; (2) **thêm empty-state cho News** để tránh trang trắng. Các lỗi nhỏ: nhãn danh mục Artwork/And More, `<img>` ở Services.
