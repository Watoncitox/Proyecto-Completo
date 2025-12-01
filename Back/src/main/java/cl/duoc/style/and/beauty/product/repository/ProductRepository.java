package cl.duoc.style.and.beauty.product.repository;

import cl.duoc.style.and.beauty.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
