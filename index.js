const prompt = require('prompt-sync')({ sigint: true })

let todos = []

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  return Date.now().toString() + Math.random().toString(36).substring(2, 9)
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan

  const text = prompt('Enter to-do text: ').trim()

  if (!text) {
    console.log('Invalid to-do. Please enter non-empty text.')
    return
  }

  const todo = {
    id: generateUniqueId(),
    text,
    isCompleted: false,
  }

  todos.push(todo)

  console.log(`To-do "${text}" added.`)

  // Tampilkan list setelah menambah to-do
  listTodos()
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai

  // Tampilkan list untuk memilih to-do yang akan ditandai selesai
  listTodos()

  if (todos.length === 0) return

  const input = prompt('Enter NUMBER of the to-do to mark as completed: ').replace(/\s+/g, '')

  // Validasi input
  const index = getIndexOrValidate(input)
  if (index === undefined) return

  const todo = todos[index]

  if (todo.isCompleted) {
    console.log(`To-do "${todo.text}" is already completed.`)
    return
  }

  todo.isCompleted = true

  console.log(`To-do "${todo.text}" marked as completed.`)

  // Tampilkan list setelah menandai to-do
  listTodos()
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus

  // Tampilkan list untuk memilih to-do yang akan dihapus
  listTodos()

  if (todos.length === 0) return

  const input = prompt('Enter NUMBER of the to-do to delete: ').replace(/\s+/g, '')

  // Validasi input
  const index = getIndexOrValidate(input)
  if (index === undefined) return

  const removed = todos.splice(index, 1)[0]

  console.log(`To-do "${removed.text}" deleted.`)

  // Tampilkan list setelah menghapus to-do
  listTodos()
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar

  if (todos.length === 0) {
    console.log('No to-dos to display.')
    return
  }

  console.log('TO-DO LIST:')
  todos.forEach((todo, i) => {
    const status = todo.isCompleted ? '[DONE]' : '[ACTIVE]'
    console.log(`${i + 1}. ${status} | ${todo.text}`)
  })
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid

    console.log('\n====================== TO-DO MENU ======================')
    console.log('Please choose a command by typing the command or its number:')
    console.log('1. add      → Add a new to-do item')
    console.log('2. complete → Mark an existing to-do as completed')
    console.log('3. delete   → Remove a to-do from the list')
    console.log('4. list     → Display all current to-do items')
    console.log('5. exit     → Quit the to-do application')

    const cmd = prompt('Type a command or number (e.g., "add" or "1"): ')
      .replace(/\s+/g, '')
      .toLowerCase()

    switch (cmd) {
      case 'add':
      case '1':
        addTodo()
        break

      case 'complete':
      case '2':
        markTodoCompleted()
        break

      case 'delete':
      case '3':
        deleteTodo()
        break

      case 'list':
      case '4':
        listTodos()
        break

      case 'exit':
      case '5':
        console.log('Exiting...')
        running = false
        break

      default:
        console.log('Invalid command. Try again.')
        break
    }
  }
}

function getIndexOrValidate(input) {
  const index = Number(input) - 1

  if (!input || isNaN(index) || index < 0 || index >= todos.length) {
    console.log('Invalid number. Please enter a valid number from the list.')
    return
  }

  return index
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp()
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
}
