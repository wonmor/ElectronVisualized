tar -xf libxc-4.3.4.tar.gz
cd libxc-4.3.4
./configure --enable-shared --disable-fortran  --prefix=/usr
make
make check
sudo make install
