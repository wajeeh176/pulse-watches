import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import API from '../../api/api';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { toast } from 'react-toastify';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    countInStock: '',
    images: []
  });
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (product = null) => {
    if (product) {
      setEditMode(true);
      setCurrentProduct(product);
    } else {
      setEditMode(false);
      setCurrentProduct({
        title: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        countInStock: '',
        images: []
      });
      setImageInput('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct({
      title: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      countInStock: '',
      images: []
    });
    setImageInput('');
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await API.put(`/products/${currentProduct._id}`, currentProduct);
        toast.success('Product updated successfully!');
      } else {
        await API.post('/products', currentProduct);
        toast.success('Product added successfully!');
      }
      handleClose();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setCurrentProduct((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()]
      }));
      setImageInput('');
    }
  };

  const handleRemoveImage = (index) => {
    setCurrentProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Brand</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Stock</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.brand || '-'}</TableCell>
                <TableCell>{product.category || '-'}</TableCell>
                <TableCell>Rs. {product.price?.toLocaleString()}</TableCell>
                <TableCell>{product.countInStock}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={currentProduct.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={currentProduct.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Brand"
            name="brand"
            value={currentProduct.brand}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={currentProduct.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Category"
            name="category"
            value={currentProduct.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="e.g., Men, Women, Luxury"
          />
          <TextField
            label="Count In Stock"
            name="countInStock"
            type="number"
            value={currentProduct.countInStock}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Image Upload Section */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Product Images
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <TextField
                label="Image filename (e.g., rolex.png)"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                fullWidth
                size="small"
                placeholder="Enter image filename from /public/images/"
                InputProps={{
                  startAdornment: <ImageIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddImage}
                disabled={!imageInput.trim()}
              >
                Add
              </Button>
            </Stack>

            {/* Display Added Images */}
            {currentProduct.images.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Added Images:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {currentProduct.images.map((img, index) => (
                    <Chip
                      key={index}
                      label={img}
                      onDelete={() => handleRemoveImage(index)}
                      deleteIcon={<CloseIcon />}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            )}
            
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Note: Images should be placed in client/public/images/ folder
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

