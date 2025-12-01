package cl.duoc.style.and.beauty.trabajador.controller;

import cl.duoc.style.and.beauty.trabajador.dto.TrabajadorDTO;
import cl.duoc.style.and.beauty.trabajador.dto.TrabajadorRequestDTO;
import cl.duoc.style.and.beauty.trabajador.service.TrabajadorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trabajador")
@CrossOrigin(origins = "*")
public class TrabajadorController {

    private final TrabajadorService service;

    public TrabajadorController(TrabajadorService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TrabajadorDTO>> listar() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrabajadorDTO> obtener(@PathVariable Long id) {
        TrabajadorDTO dto = service.findById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<TrabajadorDTO> crear(@RequestBody TrabajadorRequestDTO dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrabajadorDTO> actualizar(@PathVariable Long id,
                                                    @RequestBody TrabajadorRequestDTO dto) {
        TrabajadorDTO actualizado = service.update(id, dto);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
