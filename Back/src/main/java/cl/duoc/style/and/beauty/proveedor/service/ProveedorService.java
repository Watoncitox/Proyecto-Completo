package cl.duoc.style.and.beauty.proveedor.service;

import cl.duoc.style.and.beauty.proveedor.dto.ProveedorDTO;
import cl.duoc.style.and.beauty.proveedor.dto.ProveedorRequestDTO;
import cl.duoc.style.and.beauty.proveedor.model.Proveedor;
import cl.duoc.style.and.beauty.proveedor.repository.ProveedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProveedorService {

    private final ProveedorRepository repo;

    public ProveedorService(ProveedorRepository repo) {
        this.repo = repo;
    }

    private ProveedorDTO toDTO(Proveedor p) {
        ProveedorDTO dto = new ProveedorDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setContacto(p.getContacto());
        dto.setTelefono(p.getTelefono());
        dto.setDireccion(p.getDireccion());
        return dto;
    }

    public List<ProveedorDTO> findAll() {
        return repo.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProveedorDTO findById(Long id) {
        return repo.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public ProveedorDTO save(ProveedorRequestDTO dto) {
        Proveedor p = new Proveedor();
        p.setNombre(dto.getNombre());
        p.setContacto(dto.getContacto());
        p.setTelefono(dto.getTelefono());
        p.setDireccion(dto.getDireccion());

        return toDTO(repo.save(p));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
