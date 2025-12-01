package cl.duoc.style.and.beauty;

import cl.duoc.style.and.beauty.product.model.Product;
import cl.duoc.style.and.beauty.product.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test/products")
public class ProductTestController {

    private final ProductRepository repository;

    public ProductTestController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Product> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Product create(@RequestBody Product p) {
        return repository.save(p);
    }
}
