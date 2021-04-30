-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2021 at 05:32 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eprops`
--

-- --------------------------------------------------------

--
-- Table structure for table `family`
--

CREATE TABLE `family` (
  `id_people` int(11) NOT NULL,
  `kk` varchar(50) NOT NULL,
  `hubunganKeluarga` int(5) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `family`
--

INSERT INTO `family` (`id_people`, `kk`, `hubunganKeluarga`, `createdAt`, `updatedAt`) VALUES
(1, '1111111111111111', 1, '0000-00-00', '0000-00-00'),
(2, '1111111111111111', 3, '0000-00-00', '0000-00-00'),
(6, '2222222222222222', 2, '0000-00-00', '0000-00-00'),
(13, '2222222222222222', 4, '0000-00-00', '0000-00-00'),
(14, '1111111111111111', 2, '0000-00-00', '0000-00-00'),
(15, '2222222222222222', 1, '0000-00-00', '0000-00-00'),
(22, '8888888888888888', 1, '0000-00-00', '2021-01-05'),
(23, '8888888888888888', 2, '0000-00-00', '2021-01-05'),
(24, '8888888888888888', 4, '0000-00-00', '2021-01-05'),
(26, '8888888888888888', 4, '0000-00-00', '2021-01-05'),
(33, '1111111111111111', 4, '2021-01-06', '2021-01-06'),
(35, '2222222222222222', 4, '2021-01-11', '2021-01-11');

-- --------------------------------------------------------

--
-- Table structure for table `family_role`
--

CREATE TABLE `family_role` (
  `hubunganKeluarga` int(5) NOT NULL,
  `jenisrole` varchar(10) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `family_role`
--

INSERT INTO `family_role` (`hubunganKeluarga`, `jenisrole`, `createdAt`) VALUES
(1, 'Kepala', '0000-00-00'),
(2, 'Istri', '0000-00-00'),
(3, 'Saudara', '0000-00-00'),
(4, 'Anak', '0000-00-00'),
(5, 'Lainnya', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id_feedback` int(11) NOT NULL,
  `id_message` int(11) NOT NULL,
  `id_people` int(11) NOT NULL,
  `id_kategori` int(10) NOT NULL,
  `tanggalkirim` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `tanggalproses` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `tanggalselesai` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `tanggalbaca` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id_feedback`, `id_message`, `id_people`, `id_kategori`, `tanggalkirim`, `tanggalproses`, `tanggalselesai`, `tanggalbaca`, `createdAt`) VALUES
(1, 15, 1, 1, '2021-01-11 04:05:26', '2021-01-11 04:09:06', '2021-01-11 04:14:09', '2021-01-11 04:14:43', '2021-01-11'),
(2, 15, 2, 2, '2021-01-11 04:04:10', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2021-01-11');

-- --------------------------------------------------------

--
-- Table structure for table `feedback_kategori`
--

CREATE TABLE `feedback_kategori` (
  `id_kategori` int(10) NOT NULL,
  `kategori` varchar(30) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback_kategori`
--

INSERT INTO `feedback_kategori` (`id_kategori`, `kategori`, `createdAt`) VALUES
(1, 'Kategori A', '0000-00-00'),
(2, 'Kategori B', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `feedback_status`
--

CREATE TABLE `feedback_status` (
  `id_status` int(11) NOT NULL,
  `id_feedback` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback_status`
--

INSERT INTO `feedback_status` (`id_status`, `id_feedback`, `status`, `id_user`, `createdAt`) VALUES
(1, 1, 'Hanya percobaan saja', 15, '2021-01-11');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `isi` varchar(500) NOT NULL,
  `gambar` varchar(100) NOT NULL,
  `penerima` varchar(50) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id_message`, `subject`, `isi`, `gambar`, `penerima`, `createdAt`, `updatedAt`) VALUES
(9, 'Testing (Noticeboard)', 'Percobaan Ke-8', 'https://www.w3schools.com/js/js_arrays.asp', '[1,2,14,33]', '2021-01-06', '2021-01-06'),
(10, 'Testing Ke-2 (Noticeboard)', 'Percobaan Ke-1', 'https://sequelize.org/master/manual/model-basics.html', '[\"6\",\"13\",\"15\"]', '2021-01-06', '2021-01-06'),
(11, 'Testing Ke-3 (Noticeboard)', 'Percobaan Ke-1', 'https://www.youtube.com/results?search_query=tutorial+vue+js+indonesia+', '[\"1\",\"27\"]', '2021-01-06', '2021-01-06'),
(14, 'Testing Ke-4 (Noticeboard)', 'Percobaan Ke-1', 'https://jagasolution.com/jagaapp/', '[\"1\",\"2\"]', '2021-01-11', '2021-01-11'),
(15, 'Testing Ke-2 (Feedback)', 'Percobaan Ke-1', 'https://github.com/AqilHalim/eprops/tree/master', '[\"1\",\"2\"]', '2021-01-11', '2021-01-11'),
(16, 'Testing Ke-5 (Noticeboard)', 'Percobaan Ke-2 (Draft)', 'https://github.com/AqilHalim/eprops/tree/master', '[\"1\",\"2\"]', '2021-01-14', '2021-01-18'),
(17, 'Testing Ke-6 (Noticeboard)', 'Percobaan Ke-1', 'https://github.com/AqilHalim/', '[\"1\",\"2\"]', '2021-01-14', '2021-01-14'),
(19, 'Testing Ke-7 (Noticeboard)', 'Percobaan Ke-1', 'https://github.com/AqilHalim/', '[\"1\",\"2\"]', '2021-01-14', '2021-01-14');

-- --------------------------------------------------------

--
-- Table structure for table `noticeboard`
--

CREATE TABLE `noticeboard` (
  `id_noticeboard` int(11) NOT NULL,
  `id_message` int(11) NOT NULL,
  `id_people` int(11) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `noticeboard`
--

INSERT INTO `noticeboard` (`id_noticeboard`, `id_message`, `id_people`, `createdAt`) VALUES
(1, 9, 1, '2021-01-06'),
(2, 9, 2, '2021-01-06'),
(3, 9, 14, '2021-01-06'),
(4, 9, 33, '2021-01-06'),
(5, 10, 6, '2021-01-06'),
(6, 10, 13, '2021-01-06'),
(7, 10, 15, '2021-01-06'),
(8, 11, 1, '2021-01-06'),
(10, 14, 1, '2021-01-11'),
(11, 14, 2, '2021-01-11'),
(14, 19, 1, '2021-01-14'),
(15, 19, 2, '2021-01-14'),
(16, 16, 1, '2021-01-18'),
(17, 16, 2, '2021-01-18');

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id_people` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `nik` varchar(20) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `unitRumah` int(10) NOT NULL,
  `kelurahan` int(10) DEFAULT NULL,
  `kecamatan` int(10) DEFAULT NULL,
  `kabupaten` int(10) DEFAULT NULL,
  `provinsi` int(10) NOT NULL,
  `kodepos` int(5) DEFAULT NULL,
  `tempatlahir` varchar(20) NOT NULL,
  `tanggallahir` date NOT NULL,
  `jeniskelamin` varchar(10) NOT NULL,
  `agama` varchar(10) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `pekerjaan` varchar(20) DEFAULT NULL,
  `warganegara` varchar(3) DEFAULT NULL,
  `hp` varchar(12) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id_people`, `nama`, `nik`, `alamat`, `unitRumah`, `kelurahan`, `kecamatan`, `kabupaten`, `provinsi`, `kodepos`, `tempatlahir`, `tanggallahir`, `jeniskelamin`, `agama`, `status`, `pekerjaan`, `warganegara`, `hp`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'Aqil Halim', '3674010511970001', 'Kalimantan III Blok E11/2 Nusa Loka', 0, 0, 0, 0, 0, 15322, 'Tangerang', '1997-11-05', 'Pria', 'Islam', 'Belum Menikah', 'Pegawai Swasta', 'WNI', '082218881099', 'aqilhalim@yahoo.co.id', '0000-00-00', '0000-00-00'),
(2, 'Thariq Halim', '3674011612990003', 'Kalimantan II Blok E10/1 Nusa Loka', 0, 0, 0, 0, 0, 15322, 'Tangerang', '1999-12-16', 'Pria', 'Islam', 'Belum Menikah', 'Pelajar', 'WNA', '082220101999', 'thariqhalim@yahoo.co.id', '0000-00-00', '0000-00-00'),
(6, 'Liya Halim', '3674011709940004', 'Sulawesi', 0, 0, 0, 0, 0, 15322, 'Jakarta', '1994-09-18', 'Wanita', 'Islam', 'Sudah Menikah', 'IRT', 'WNI', '082220101994', 'liya@hotmail.com', '0000-00-00', '0000-00-00'),
(13, 'El Kaysan', '3674011709940005', 'Sulawesi', 0, 0, 0, 0, 0, 15322, 'Jakarta', '1994-09-18', 'Wanita', 'Islam', '0', '0', 'WNI', '082220101994', 'liya@hotmail.com', '0000-00-00', '0000-00-00'),
(14, 'Renintha Trianjani', '3674010511970002', 'Kalimantan 3 Blok E11/2 Nusa Loka', 0, 0, 0, 0, 0, 15322, 'Jakarta', '1997-11-22', 'Wanita', 'Islam', 'Belum Menikah', 'Pegawai Swasta', 'WNI', '082219991088', 'renin@yahoo.co.id', '0000-00-00', '2021-03-15'),
(15, 'Kurnia Arief', '3674011612990007', 'Kalimantan II Blok E10/1 Nusa Loka', 0, 0, 0, 0, 0, 15322, 'Medan', '1994-10-10', 'Pria', NULL, NULL, NULL, 'WNI', '0222222222', 'kurnia@yahoo.co.id', '0000-00-00', '0000-00-00'),
(22, 'Bapak Halim', '3674010511970009', 'Kalimantan III Blok E11/2 Nusa Loka', 0, 0, 0, 0, 0, 15322, 'Tangerang', '1997-11-05', 'Pria', 'Islam', 'Belum Menikah', 'Pegawai Swasta', 'WNI', '082218881099', 'aqilhalim@yahoo.co.id', '0000-00-00', '0000-00-00'),
(23, 'Istri Halim', '3674010511970010', 'Kalimantan III Blok E11/2 Nusa Loka', 0, 0, 0, 0, 0, 15322, 'Tangerang', '1997-11-05', 'Pria', 'Islam', 'Belum Menikah', 'Pegawai Swasta', 'WNI', '082218881099', 'aqilhalim@yahoo.co.id', '0000-00-00', '0000-00-00'),
(24, 'Anak Pertama Halim', '3674010511970011', 'Kalimantan III Blok E11/2 Nusa Loka', 0, 0, 0, 0, 0, 15322, 'Tangerang', '1997-11-05', 'Pria', 'Islam', 'Belum Menikah', 'Pegawai Swasta', 'WNI', '082218881099', 'aqilhalim@yahoo.co.id', '0000-00-00', '0000-00-00'),
(26, 'Anak Kedua Halim', '3674010511970019', 'Kalimantan III Blok E11/2 Nusa Loka', 0, 0, 0, 0, 0, 15322, 'Tangerang', '1997-11-05', 'Pria', NULL, NULL, NULL, 'WNI', '081122223455', 'aqilhalim@yahoo.co.id', '0000-00-00', '2021-01-05'),
(33, 'Ucil', '3674010511970111', 'Kalimantan III Blok E11/2 Nusa Loka', 0, 0, NULL, NULL, 0, NULL, 'Tangerang', '2020-01-05', 'Pria', NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-06', '2021-01-06'),
(35, 'Ame', '3674011612990008', 'Kalimantan II Blok E10/1 Nusa Loka', 0, 0, NULL, NULL, 0, NULL, 'Jakarta', '2019-01-03', 'Wanita', NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-11', '2021-01-11');

-- --------------------------------------------------------

--
-- Table structure for table `people_role`
--

CREATE TABLE `people_role` (
  `id_people` int(11) NOT NULL,
  `jenisrole` varchar(50) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `people_role`
--

INSERT INTO `people_role` (`id_people`, `jenisrole`, `createdAt`, `updatedAt`) VALUES
(1, 'Customer', '0000-00-00', '0000-00-00'),
(2, 'BM', '0000-00-00', '0000-00-00'),
(15, 'Customer', '2021-01-06', '2021-01-06'),
(35, 'Customer', '2021-01-11', '2021-01-11');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id_property` int(11) NOT NULL,
  `jenis` varchar(20) NOT NULL,
  `nama_p` varchar(30) NOT NULL,
  `alamat_p` varchar(50) NOT NULL,
  `kecamatan_p` varchar(20) DEFAULT NULL,
  `kabupaten_p` varchar(20) DEFAULT NULL,
  `kodepos_p` int(5) DEFAULT NULL,
  `luas` int(5) NOT NULL,
  `latitude` varchar(30) NOT NULL,
  `longitude` varchar(30) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `furnish` varchar(20) DEFAULT NULL,
  `harga` int(30) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id_property`, `jenis`, `nama_p`, `alamat_p`, `kecamatan_p`, `kabupaten_p`, `kodepos_p`, `luas`, `latitude`, `longitude`, `foto`, `furnish`, `harga`, `createdAt`, `updatedAt`) VALUES
(1, 'Apartemen', 'Tree Partment', 'Sun Burst, BSD', NULL, NULL, NULL, 23, '-6.295598901025049', '106.66926254846967', NULL, NULL, 1000000000, '0000-00-00', '0000-00-00'),
(2, 'Apartemen', 'Four Partment', 'Moon Burst, BSD', NULL, NULL, NULL, 18, '-6.295598901025049', '106.66926254846967', NULL, NULL, 850000000, '0000-00-00', '2021-01-06'),
(4, 'Tanah', 'Tanah Ajib', 'Gading Serpong', NULL, NULL, NULL, 15, '-6.295598901025049\n', '106.66926254846967', NULL, NULL, 750000000, '2021-01-06', '2021-01-06'),
(5, 'Rumah', 'Rumah Ajib', 'Gading Serpong', NULL, NULL, NULL, 13, '-6.295598901025049\n', '106.66926254846967', NULL, NULL, 900000000, '2021-01-11', '2021-01-11');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210426100944-create-posts.js');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_people` int(11) NOT NULL,
  `id_property` int(11) NOT NULL,
  `tglpembelian` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `jmlpembayaran` int(30) NOT NULL,
  `status` varchar(10) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_people`, `id_property`, `tglpembelian`, `jmlpembayaran`, `status`, `createdAt`) VALUES
(1, 1, '2021-01-14 02:27:58', 1000000000, 'Active', '0000-00-00'),
(2, 2, '2021-01-14 02:27:59', 850000000, 'Active', '0000-00-00'),
(6, 5, '2021-01-14 02:27:59', 900000000, 'Active', '2021-01-11'),
(15, 4, '2021-01-14 02:27:59', 750000000, 'Active', '2021-01-06');

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id_people` int(11) NOT NULL,
  `id_property` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id_people`, `id_property`, `createdAt`, `updatedAt`) VALUES
(1, 1, '0000-00-00', '0000-00-00'),
(2, 2, '0000-00-00', '0000-00-00'),
(6, 5, '0000-00-00', '0000-00-00'),
(15, 4, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `family`
--
ALTER TABLE `family`
  ADD PRIMARY KEY (`id_people`),
  ADD KEY `role` (`hubunganKeluarga`);

--
-- Indexes for table `family_role`
--
ALTER TABLE `family_role`
  ADD PRIMARY KEY (`hubunganKeluarga`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id_feedback`),
  ADD KEY `id_notice` (`id_message`),
  ADD KEY `id_people` (`id_people`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- Indexes for table `feedback_kategori`
--
ALTER TABLE `feedback_kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `feedback_status`
--
ALTER TABLE `feedback_status`
  ADD PRIMARY KEY (`id_status`),
  ADD KEY `id_feedback` (`id_feedback`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`);

--
-- Indexes for table `noticeboard`
--
ALTER TABLE `noticeboard`
  ADD PRIMARY KEY (`id_noticeboard`),
  ADD KEY `id_noticeboard` (`id_message`),
  ADD KEY `id_people` (`id_people`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id_people`),
  ADD UNIQUE KEY `nik` (`nik`);

--
-- Indexes for table `people_role`
--
ALTER TABLE `people_role`
  ADD PRIMARY KEY (`id_people`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id_property`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_people`,`id_property`),
  ADD KEY `id_property` (`id_property`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id_people`,`id_property`),
  ADD KEY `id_property` (`id_property`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `family_role`
--
ALTER TABLE `family_role`
  MODIFY `hubunganKeluarga` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id_feedback` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feedback_kategori`
--
ALTER TABLE `feedback_kategori`
  MODIFY `id_kategori` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feedback_status`
--
ALTER TABLE `feedback_status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `noticeboard`
--
ALTER TABLE `noticeboard`
  MODIFY `id_noticeboard` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id_people` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id_property` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `family`
--
ALTER TABLE `family`
  ADD CONSTRAINT `family_ibfk_2` FOREIGN KEY (`hubunganKeluarga`) REFERENCES `family_role` (`hubunganKeluarga`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `family_ibfk_3` FOREIGN KEY (`id_people`) REFERENCES `people` (`id_people`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`id_message`) REFERENCES `message` (`id_message`) ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`id_people`) REFERENCES `people` (`id_people`) ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_3` FOREIGN KEY (`id_kategori`) REFERENCES `feedback_kategori` (`id_kategori`) ON UPDATE CASCADE;

--
-- Constraints for table `feedback_status`
--
ALTER TABLE `feedback_status`
  ADD CONSTRAINT `feedback_status_ibfk_1` FOREIGN KEY (`id_feedback`) REFERENCES `feedback` (`id_feedback`) ON UPDATE CASCADE;

--
-- Constraints for table `noticeboard`
--
ALTER TABLE `noticeboard`
  ADD CONSTRAINT `noticeboard_ibfk_1` FOREIGN KEY (`id_message`) REFERENCES `message` (`id_message`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `noticeboard_ibfk_2` FOREIGN KEY (`id_people`) REFERENCES `people` (`id_people`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `people_role`
--
ALTER TABLE `people_role`
  ADD CONSTRAINT `people_role_ibfk_1` FOREIGN KEY (`id_people`) REFERENCES `people` (`id_people`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_people`) REFERENCES `people` (`id_people`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_property`) REFERENCES `property` (`id_property`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `unit`
--
ALTER TABLE `unit`
  ADD CONSTRAINT `unit_ibfk_1` FOREIGN KEY (`id_people`) REFERENCES `people` (`id_people`) ON UPDATE CASCADE,
  ADD CONSTRAINT `unit_ibfk_2` FOREIGN KEY (`id_property`) REFERENCES `property` (`id_property`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
