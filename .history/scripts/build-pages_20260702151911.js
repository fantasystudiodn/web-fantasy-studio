const fs = require('node:fs');
const path = require('node:path');
const ejs = require('ejs');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const viewsDir = path.join(rootDir, 'views');
const docsDir = path.join(rootDir, 'docs');

const homeTemplatePath = path.join(viewsDir, 'home.ejs');
const outputHtmlPath = path.join(docsDir, 'index.html');

/**
 * Copy toàn bộ nội dung của thư mục public sang docs.
 */
function copyPublicFiles() {
  if (!fs.existsSync(publicDir)) {
    throw new Error(`Không tìm thấy thư mục public: ${publicDir}`);
  }

  const publicItems = fs.readdirSync(publicDir, {
    withFileTypes: true
  });

  for (const item of publicItems) {
    const sourcePath = path.join(publicDir, item.name);
    const destinationPath = path.join(docsDir, item.name);

    fs.cpSync(sourcePath, destinationPath, {
      recursive: true,
      force: true
    });
  }
}

/**
 * Chuyển đường dẫn tuyệt đối của Express thành đường dẫn tương đối
 * phù hợp với GitHub Pages.
 */
function convertHtmlPaths(html) {
  return html
    // href="/css/..." → href="./css/..."
    // src="/js/..." → src="./js/..."
    // src="/assets/..." → src="./assets/..."
    // poster="/assets/..." → poster="./assets/..."
    .replace(
      /(href|src|poster)=(["'])\/(css|js|assets)\//g,
      '$1=$2./$3/'
    )

    // Xử lý đường dẫn /assets/ trong JavaScript viết trực tiếp trong HTML.
    .replace(
      /(["'`])\/assets\//g,
      '$1./assets/'
    );
}

/**
 * Chuyển đường dẫn ảnh trong file JavaScript.
 */
function convertJavaScriptPaths(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /(["'`])\/assets\//g,
    '$1./assets/'
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * Chuyển đường dẫn ảnh trong file CSS.
 * home.css nằm trong docs/css nên ảnh phải đi lên một cấp:
 * ../assets/...
 */
function convertCssPaths(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /url\((["']?)\/assets\//g,
    'url($1../assets/'
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

async function buildGitHubPages() {
  try {
    console.log('Đang build website cho GitHub Pages...');

    if (!fs.existsSync(homeTemplatePath)) {
      throw new Error(
        `Không tìm thấy file giao diện: ${homeTemplatePath}`
      );
    }

    // Xóa bản build cũ.
    fs.rmSync(docsDir, {
      recursive: true,
      force: true
    });

    // Tạo lại thư mục docs.
    fs.mkdirSync(docsDir, {
      recursive: true
    });

    // Render EJS thành HTML.
    const renderedHtml = await ejs.renderFile(
      homeTemplatePath,
      {
        title: 'Fantasy Studio | Fantasy Becomes Reality'
      }
    );

    const staticHtml = convertHtmlPaths(renderedHtml);

    fs.writeFileSync(
      outputHtmlPath,
      staticHtml,
      'utf8'
    );

    // Copy CSS, JS, ảnh và video.
    copyPublicFiles();

    // Chuyển đường dẫn trong JS.
    convertJavaScriptPaths(
      path.join(docsDir, 'js', 'home.js')
    );

    // Chuyển đường dẫn trong CSS.
    convertCssPaths(
      path.join(docsDir, 'css', 'home.css')
    );

    // Không cho GitHub Pages xử lý site bằng Jekyll.
    fs.writeFileSync(
      path.join(docsDir, '.nojekyll'),
      '',
      'utf8'
    );

    console.log('');
    console.log('========================================');
    console.log('BUILD THÀNH CÔNG');
    console.log(`Output: ${docsDir}`);
    console.log('========================================');
  } catch (error) {
    console.error('');
    console.error('BUILD THẤT BẠI');
    console.error(error);

    process.exit(1);
  }
}

buildGitHubPages();