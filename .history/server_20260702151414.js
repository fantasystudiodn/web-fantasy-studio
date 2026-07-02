const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const stats = [
  { value: '25+', label: 'Thành viên', icon: 'users' },
  { value: '12+', label: 'Dự án đã phát hành', icon: 'calendar' },
  { value: '5M+', label: 'Lượt tải game', icon: 'download' },
  { value: '3+', label: 'Năm kinh nghiệm', icon: 'medal' }
];

const members = [
  {
    name: 'Lê Thái Lâm',
    role: 'Game Designer',
    image: '/assets/members/le-thai-lam.jpg',
    bio: 'Thiết kế gameplay, level flow và trải nghiệm người chơi cho các dự án mobile game.',
    tags: ['Game Design', 'Puzzle', 'Balancing'],
    linkedin: '#',
    portfolio: '#'
  },
  {
    name: 'Đặng Nguyễn Hùng',
    role: 'System Designer',
    image: '/assets/members/dang-nguyen-hung.jpg',
    bio: 'Xây dựng hệ thống game, chỉ số, vòng lặp gameplay và progression cho sản phẩm.',
    tags: ['System', 'RPG', 'Progression'],
    linkedin: '#',
    portfolio: '#'
  },
  {
    name: 'Đinh Dương',
    role: 'Developer',
    image: '/assets/members/dinh-duong.jpg',
    bio: 'Phát triển core gameplay, tối ưu hiệu năng và xử lý logic cho game mobile/Steam.',
    tags: ['Unity', 'C#', 'Optimization'],
    linkedin: '#',
    portfolio: '#'
  },
  {
    name: 'Hoàng Duy Nhất',
    role: 'Project Manager',
    image: '/assets/members/hoang-duy-nhat.jpg',
    bio: 'Quản lý tiến độ, kết nối team và đảm bảo chất lượng sản phẩm trước khi phát hành.',
    tags: ['Planning', 'Product', 'Teamwork'],
    linkedin: '#',
    portfolio: '#'
  },
  {
    name: 'Minh Hòa',
    role: '2D Game Artist',
    image: '/assets/members/minh-hoa.jpg',
    bio: 'Thiết kế concept art, UI game, nhân vật và asset theo phong cách trẻ trung hiện đại.',
    tags: ['2D Art', 'UI', 'Concept'],
    linkedin: '#',
    portfolio: '#'
  },
  {
    name: 'Võ Phương Nhi',
    role: 'Game Designer / Illustrator',
    image: '/assets/members/vo-phuong-nhi.jpg',
    bio: 'Thiết kế ý tưởng game, minh họa nhân vật và hoàn thiện visual direction cho sản phẩm.',
    tags: ['Design', 'Illustration', 'Blender'],
    linkedin: '#',
    portfolio: '#'
  }
];

const values = [
  {
    title: 'Hợp tác cởi mở',
    description: 'Chúng tôi tin vào sức mạnh của teamwork, lắng nghe và tôn trọng ý kiến của nhau.',
    icon: 'team'
  },
  {
    title: 'Tập trung vào chất lượng',
    description: 'Mỗi sản phẩm đều được chăm chút tỉ mỉ, đặt trải nghiệm người chơi lên hàng đầu.',
    icon: 'gamepad'
  },
  {
    title: 'Sáng tạo & Giải quyết vấn đề',
    description: 'Luôn tìm kiếm ý tưởng mới và dám thử thách để tạo nên trải nghiệm khác biệt.',
    icon: 'idea'
  }
];

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Fantasy Studio | Fantasy Becomes Reality'
  });
});

app.use((req, res) => {
  res.status(404).redirect('/');
});

app.listen(PORT, () => {
  console.log(`Fantasy Studio đang chạy tại http://localhost:${PORT}`);
});
