package cl.duoc.style.and.beauty.horario.controller;

import cl.duoc.style.and.beauty.horario.dto.HorarioTrabajadorDTO;
import cl.duoc.style.and.beauty.horario.dto.HorarioTrabajadorRequestDTO;
import cl.duoc.style.and.beauty.horario.service.HorarioTrabajadorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/horario")
@CrossOrigin(origins = "*")
public class HorarioTrabajadorController {

    private final HorarioTrabajadorService service;

    public HorarioTrabajadorController(HorarioTrabajadorService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<HorarioTrabajadorDTO>> listar() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HorarioTrabajadorDTO> obtener(@PathVariable Long id) {
        HorarioTrabajadorDTO dto = service.findById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<HorarioTrabajadorDTO> crear(@RequestBody HorarioTrabajadorRequestDTO dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HorarioTrabajadorDTO> actualizar(@PathVariable Long id,
                                                           @RequestBody HorarioTrabajadorRequestDTO dto) {
        HorarioTrabajadorDTO actualizado = service.update(id, dto);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
