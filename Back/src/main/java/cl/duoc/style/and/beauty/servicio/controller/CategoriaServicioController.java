package cl.duoc.style.and.beauty.servicio.controller;

import cl.duoc.style.and.beauty.servicio.model.CategoriaServicio;
import cl.duoc.style.and.beauty.servicio.repository.CategoriaServicioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias-servicio")
@CrossOrigin(origins = "*")
public class CategoriaServicioController {

    private final CategoriaServicioRepository categoriaRepository;

    public CategoriaServicioController(CategoriaServicioRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaServicio>> listarCategorias() {
        return ResponseEntity.ok(categoriaRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<CategoriaServicio> crearCategoria(@RequestBody CategoriaServicio categoria) {
        return ResponseEntity.ok(categoriaRepository.save(categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        categoriaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
