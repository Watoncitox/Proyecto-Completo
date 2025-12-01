package cl.duoc.style.and.beauty.inventario.controller;

import cl.duoc.style.and.beauty.inventario.dto.InventarioDTO;
import cl.duoc.style.and.beauty.inventario.dto.InventarioRequestDTO;
import cl.duoc.style.and.beauty.inventario.service.InventarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventario") // <-- ESTA ES LA RUTA QUE POSTMAN ESTÁ BUSCANDO
@CrossOrigin(origins = "*")
public class InventarioController {

    private final InventarioService service;

    public InventarioController(InventarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<InventarioDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public InventarioDTO getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public InventarioDTO create(@RequestBody InventarioRequestDTO dto) {
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public InventarioDTO update(@PathVariable Long id, @RequestBody InventarioRequestDTO dto) {
        InventarioDTO existente = service.findById(id);
        if (existente == null) {
            return null;
        }
        return service.save(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
