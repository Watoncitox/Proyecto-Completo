package cl.duoc.style.and.beauty.product.service;

import cl.duoc.style.and.beauty.product.dto.ProductDTO;
import cl.duoc.style.and.beauty.product.dto.ProductRequestDTO;
import cl.duoc.style.and.beauty.product.model.Product;
import cl.duoc.style.and.beauty.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) { // ← CORREGIDO
        this.productRepository = productRepository;
    }

    // Convertir de Entity → DTO
    private ProductDTO toDTO(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setDescripcion(p.getDescripcion());
        dto.setPrecio(p.getPrecio());
        dto.setCategoria(p.getCategoria());
        dto.setStockMinimo(p.getStockMinimo());
        return dto;
    }

    // Convertir de RequestDTO → Entity
    private Product toEntity(ProductRequestDTO dto) {
        Product p = new Product();
        p.setNombre(dto.getNombre());
        p.setDescripcion(dto.getDescripcion());
        p.setPrecio(dto.getPrecio());
        p.setCategoria(dto.getCategoria());
        p.setStockMinimo(dto.getStockMinimo());
        return p;
    }

    // SAVE
    public ProductDTO save(ProductRequestDTO dto) {
        Product entity = toEntity(dto);
        Product saved = productRepository.save(entity);
        return toDTO(saved);
    }

    // GET ALL
    public List<ProductDTO> findAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    public ProductDTO findById(Long id) {
        return productRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    // DELETE
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
